/*
 * (C) Copyright 2014 Kurento (http://kurento.org/)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

const PARTICIPANT_MAIN_CLASS = "participant main";
const PARTICIPANT_CLASS = "participant";

/**
 * Creates a video element for a new participant
 *
 * @param {String} name - the name of the new participant, to be used as tag
 *                        name of the video element.
 *                        The tag of the new element will be 'video<name>'
 * @return
 */
function Participant(name, idx, userId) {
  this.name = name;
  this.idx = idx;
  this.userId = userId;
  var container = document.createElement("div");
  container.className = isPresentMainParticipant()
    ? PARTICIPANT_CLASS
    : PARTICIPANT_MAIN_CLASS;
  container.id = name;
  var span = document.createElement("span");
  var video = document.createElement("video");
  /* eslint-disable no-unused-vars */
  var rtcPeer;

  container.appendChild(video);
  container.appendChild(span);
  container.onclick = switchContainerClass;
  let personalCam = document.querySelector(`#personal-${idx} #personalCam`);
  var statusText = document.createElement("div");
  var audioBan = document.createElement("span");
  var videoBan = document.createElement("span");
  audioBan.id = "audioBan";
  videoBan.id = "videoBan";
  statusText.id = "statusText";
  statusText.style.position = "absolute";
  statusText.style.padding = "0.5rem";
  videoBan.style.zIndex = 10;
  videoBan.style.fontWeight = "bold";
  audioBan.style.zIndex = 10;
  audioBan.style.fontWeight = "bold";
  statusText.appendChild(videoBan);
  statusText.appendChild(audioBan);
  personalCam.innerHTML = "";
  personalCam.appendChild(statusText);
  personalCam.appendChild(container);

  document.querySelector(`#personal-${idx} #personal_id`).innerText = name;

  video.id = "video-" + name;
  video.autoplay = true;
  video.controls = false;
  video.style.width = `${personalCam.offsetWidth}px`;
  video.style.height = `${personalCam.offsetHeight}px`;

  this.getElement = function () {
    return container;
  };

  this.getVideoElement = function () {
    return video;
  };

  function switchContainerClass() {
    if (container.className === PARTICIPANT_CLASS) {
      var elements = Array.prototype.slice.call(
        document.getElementsByClassName(PARTICIPANT_MAIN_CLASS),
      );
      elements.forEach(function (item) {
        item.className = PARTICIPANT_CLASS;
      });

      container.className = PARTICIPANT_MAIN_CLASS;
    } else {
      container.className = PARTICIPANT_CLASS;
    }
  }

  function isPresentMainParticipant() {
    return document.getElementsByClassName(PARTICIPANT_MAIN_CLASS).length !== 0;
  }

  this.offerToReceiveVideo = function (error, offerSdp, wp) {
    if (error) return console.error("sdp offer error");
    console.log("Invoking SDP offer callback function");
    var msg = { id: "receiveVideoFrom", sender: name, sdpOffer: offerSdp };
    return msg;
  };

  this.onIceCandidate = function (candidate, wp) {
    let message = {
      id: "onIceCandidate",
      candidate: candidate,
      name: name,
    };
    return message;
  };

  Object.defineProperty(this, "rtcPeer", { writable: true });

  this.dispose = function () {
    document.querySelector(`#personal-${idx} #personal_id`).innerText = "";
    console.log("Disposing participant " + this.name);
    this.rtcPeer.dispose();
    container.parentNode.removeChild(container);
  };
}

export default Participant;
