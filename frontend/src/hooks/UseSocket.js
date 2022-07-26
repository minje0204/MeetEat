import React, { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Participant from "utils/participant";
import { WebRtcPeer } from "kurento-utils";

const API_URL = process.env.REACT_APP_API_URL;

var name = "test name";
let message = {
  id: "joinRoom",
  name: "test name",
  room: "test room",
};
const participants = {};
export function onExistingParticipants(msg) {
  var constraints = {
    audio: true,
    video: {
      mandatory: {
        maxWidth: 320,
        maxFrameRate: 15,
        minFrameRate: 15,
      },
    },
  };
  var participant = new Participant(name);
  participants[name] = participant;
  var video = participant.getVideoElement();

  var options = {
    localVideo: video,
    mediaConstraints: constraints,
    onicecandidate: participant.onIceCandidate.bind(participant),
  };
  participant.rtcPeer = new WebRtcPeer.WebRtcPeerSendonly(options, function (
    error,
  ) {
    if (error) {
      return console.error(error);
    }
    this.generateOffer(participant.offerToReceiveVideo.bind(participant));
  });

  msg.data.forEach(receiveVideo);
}

export function onNewParticipant(request) {
  receiveVideo(request.name);
}
function receiveVideo(sender) {
  var participant = new Participant(sender);
  participants[sender] = participant;
  var video = participant.getVideoElement();

  var options = {
    remoteVideo: video,
    onicecandidate: participant.onIceCandidate.bind(participant),
  };

  participant.rtcPeer = new WebRtcPeer.WebRtcPeerRecvonly(options, function (
    error,
  ) {
    if (error) {
      return console.error(error);
    }
    this.generateOffer(participant.offerToReceiveVideo.bind(participant));
  });
}
export function onParticipantLeft(request) {
  console.log("Participant " + request.name + " left");
  var participant = participants[request.name];
  participant.dispose();
  delete participants[request.name];
}

export function receiveVideoResponse(result) {
  participants[result.name].rtcPeer.processAnswer(
    result.sdpAnswer,
    function (error) {
      if (error) return console.error(error);
    },
  );
}

const onMessage = message => {
  let parsedMessage = JSON.parse(message.data);
  console.info("Received message: ");
  console.info(parsedMessage);

  switch (parsedMessage.id) {
    case "existingParticipants":
      onExistingParticipants(parsedMessage);
      break;
    case "newParticipantArrived":
      onNewParticipant(parsedMessage);
      break;
    case "participantLeft":
      onParticipantLeft(parsedMessage);
      break;
    case "receiveVideoAnswer":
      receiveVideoResponse(parsedMessage);
      break;
    case "iceCandidate":
      participants[parsedMessage.name].rtcPeer.addIceCandidate(
        parsedMessage.candidate,
        function (error) {
          if (error) {
            console.error("Error adding candidate: " + error);
            return;
          }
        },
      );
      break;
    default:
      console.error("Unrecognized message", parsedMessage);
  }
};

const UseSocket = () => {
  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState(`ws://${API_URL}/groupcall`);
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    socketUrl,
    onMessage,
  );

  const customSendMsg = msg => {
    var jsonMessage = JSON.stringify(msg);
    console.log("Sending message: " + jsonMessage);
    sendMessage(jsonMessage);
  };
  useEffect(() => {
    if (lastMessage !== null) {
      onMessage(lastMessage);
      setMessageHistory(prev => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  const handleClickSendMessage = useCallback(() => customSendMsg(message), []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <div>
      <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Click Me to send 'Hello'
      </button>
      <span>The WebSocket is currently {connectionStatus}</span>
      {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      <ul>
        {messageHistory.map((message, idx) => (
          <span key={idx}>{message ? message.data : null}</span>
        ))}
      </ul>
      <div id="participants"></div>
    </div>
  );
};

export default UseSocket;
