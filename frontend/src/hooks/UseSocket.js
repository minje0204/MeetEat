import { WebRtcPeer } from "kurento-utils";
import { useCallback, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import Participant from "utils/participant";
import { constraints } from "utils/socket/video";
const API_URL = process.env.REACT_APP_API_URL;
const participants = {};
const host = null;

let onExistingParticipants;
let onNewParticipant;
let onParticipantLeft;
let receiveVideoResponse;
let onChat;
let hostChanged;

const onMessage = message => {
  let parsedMessage = JSON.parse(message.data);
  console.info("Received message: ");
  console.info(parsedMessage);

  switch (parsedMessage.id) {
    case "chat":
      onChat(parsedMessage);
      break;
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
    case "hostChanged":
      hostChanged(parsedMessage);
      break;
    default:
      console.error("Unrecognized message", parsedMessage);
  }
};
const UseSocket = ({ name, setNum }) => {
  /* eslint-disable no-unused-vars */
  const [messageHistory, setMessageHistory] = useState([]);
  /* eslint-disable no-unused-vars */
  const [socketUrl, setSocketUrl] = useState(`ws://${API_URL}/groupcall`);
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    socketUrl,
    onMessage,
  );
  onNewParticipant = request => {
    setNum(Object.keys(participants).length + 1);
    receiveVideo(request.name);
  };
  function receiveVideo(sender) {
    var participant = new Participant(sender, Object.keys(participants).length);
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
    setNum(Object.keys(participants).length);
    participants[result.name].rtcPeer.processAnswer(
      result.sdpAnswer,
      function (error) {
        if (error) return console.error(error);
      },
    );
  };

  onExistingParticipants = function (msg) {
    let participant = new Participant(name, 0); //나 자신
    setNum(Object.keys(participants).length + 1);
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

    document.querySelector(`#myAudioBtn`).addEventListener("click",()=>{
      participant.rtcPeer.audioEnabled = !participant.rtcPeer.audioEnabled
    })
    document.querySelector(`#myVideoBtn`).addEventListener("click",()=>{
      participant.rtcPeer.videoEnabled = !participant.rtcPeer.videoEnabled
    })
    console.log(msg);
    msg.data.forEach(receiveVideo); // 돌면서 참가자 모두 영상 수신
  };

  onChat = function (msg){
    let name = msg.name;
    let chat = msg.chat;
    let idx = participants[name].idx;
    let chatttingballon = document.querySelector(`#roomguest-chatting-${idx} > #chatting-ballon`);
    chatttingballon.innerHTML = chat;
    setTimeout(() => {
      chatttingballon.innerHTML = "";
    }, 3000);
  }

  function kickOut() {
    let message = {
      id: "kickOut",
      // candidate: candidate,
      name: name,
    };
    customSendMsg(message);
  };

  hostChanged = msg =>{
    host = msg.host;
  };

  const customSendMsg = msg => {
    // let flag = msg.id === "joinRoom";
    let flag = true;
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
