import { WebRtcPeer } from "kurento-utils";
import { useCallback, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import Participant from "utils/participant";
import { constraints } from "utils/socket/video";
const API_URL = process.env.REACT_APP_API_URL;
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
const UseSocket = ({ name, title }) => {
  /* eslint-disable no-unused-vars */
  const [messageHistory, setMessageHistory] = useState([]);
  /* eslint-disable no-unused-vars */
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

  onExistingParticipants = function (msg) {
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
    let flag = msg.id === "joinRoom";
    let jsonMessage = JSON.stringify(msg);
    if (flag) console.log("Sending message: " + jsonMessage);
    sendMessage(jsonMessage);
  };
  useEffect(() => {
    if (lastMessage !== null) {
      onMessage(lastMessage);
      setMessageHistory(prev => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  const handleClickSendMessage = useCallback(message => {
    customSendMsg(message);
  }, []);

  return { handleClickSendMessage, readyState };
};

export default UseSocket;

// const connectionStatus = {
//   [ReadyState.CONNECTING]: "Connecting",
//   [ReadyState.OPEN]: "Open",
//   [ReadyState.CLOSING]: "Closing",
//   [ReadyState.CLOSED]: "Closed",
//   [ReadyState.UNINSTANTIATED]: "Uninstantiated",
// }[readyState];
