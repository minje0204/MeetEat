import React, { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Participant from "utils/participant";
import { WebRtcPeer } from "kurento-utils";

const API_URL = process.env.REACT_APP_API_URL;

let name = "test name";
let message = {
  id: "joinRoom",
  name: "test name",
  room: "test room",
};
const participants = {};

let onExistingParticipants;
let onNewParticipant;
let onParticipantLeft;
let receiveVideoResponse;

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
  const [name1, setName1] = useState("");
  //Public API that will echo messages sent to it back to the client
  const [messageHistory, setMessageHistory] = useState([]);

  const [socketUrl, setSocketUrl] = useState(`ws://${API_URL}/groupcall`);
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    socketUrl,
    onMessage,
  );

  onNewParticipant = request => {
    receiveVideo(request.name);
  };
  function receiveVideo(sender) {
    var participant = new Participant(sender);
    participants[sender] = participant;
    var video = participant.getVideoElement();

    var options = {
      remoteVideo: video,
      onicecandidate: candidate =>
        customSendMsg(participant.onIceCandidate.bind(participant)(candidate)),
    };

    participant.rtcPeer = new WebRtcPeer.WebRtcPeerRecvonly(options, function (
      error,
    ) {
      if (error) {
        return console.error(error);
      }
      this.generateOffer((a, b, c) =>
        customSendMsg(
          participant.offerToReceiveVideo.bind(participant)(a, b, c),
        ),
      );
    });
  }
  onParticipantLeft = request => {
    console.log("Participant " + request.name + " left");
    var participant = participants[request.name];
    participant.dispose();
    delete participants[request.name];
  };

  receiveVideoResponse = result => {
    participants[result.name].rtcPeer.processAnswer(
      result.sdpAnswer,
      function (error) {
        if (error) return console.error(error);
      },
    );
  };

  onExistingParticipants = msg => {
    let constraints = {
      audio: true,
      video: {
        mandatory: {
          maxWidth: 320,
          maxFrameRate: 15,
          minFrameRate: 15,
        },
      },
    };
    let participant = new Participant(name);
    participants[name] = participant;
    let video = participant.getVideoElement();

    let options = {
      localVideo: video,
      mediaConstraints: constraints,
      onicecandidate: candidate =>
        customSendMsg(participant.onIceCandidate.bind(participant)(candidate)),
    };
    participant.rtcPeer = new WebRtcPeer.WebRtcPeerSendonly(options, function (
      error,
    ) {
      if (error) {
        return console.error(error);
      }

      this.generateOffer((a, b, c) =>
        customSendMsg(
          participant.offerToReceiveVideo.bind(participant)(a, b, c),
        ),
      );
    });

    msg.data.forEach(receiveVideo); // 돌면서 참가자 모두 영상 수신
  };

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

  useEffect(() => {
    message.name = name1;
    name = name1;
  }, [name1]);
  return (
    <div>
      <input
        type="text"
        value={name1}
        onChange={e => setName1(e.target.value)}
      ></input>
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
