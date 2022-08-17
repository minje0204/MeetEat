import styled from "@emotion/styled";
import RoomGuest from "components/conference/RoomGuest";
import TableSlide from "components/conference/TableSlide";
import UseSocket from "hooks/UseSocket";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SwitchMic from "components/conference/SwitchMic";
import SwitchVideo from "components/conference/SwitchVideo";
import Chatting from "components/conference/Chatting";
import Door from "components/conference/Door";
import { Link } from "react-router-dom";
import Axios from "utils/axios/Axios";
import { useNavigate } from "react-router-dom";

export default function ConferencePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { title, peopleLimit, userName, conferenceId, restaurantId, position } =
    location.state;
  const [num, setNum] = useState(1);

  const { handleClickSendMessage, rtcPeer, host } = UseSocket({
    name: location.state.userName,
    setNum,
  });

  const handleLeave = () => {
    Axios.patch(
      `/restaurant/conference/${encodeURI(conferenceId)}`,
      conferenceId,
    );
    window.sessionStorage.setItem("conferencePermission", false);
    navigate(`/restaurant/${restaurantId}`, {
      params: {
        restaurantId,
      },
    });
  };

  function getPermission() {
    if (sessionStorage.getItem("conferencePermission") === "false") {
      handleLeave();
    }
    Axios.get(`/restaurant/conference/${encodeURI(conferenceId)}`).catch(
      err => {
        if (err.response.status === 404) {
          handleLeave();
        }
      },
    );
  }

  window.onbeforeunload = function () {
    Axios.patch(
      `/restaurant/conference/${encodeURI(conferenceId)}`,
      conferenceId,
    );
    window.sessionStorage.setItem("conferencePermission", false);
    return;
  };
  useEffect(() => {
    getPermission();
  }, []);
  useEffect(() => {
    let message = {
      id: "joinRoom",
      name: userName,
      room: conferenceId,
      userId: sessionStorage.getItem("id"),
    };
    handleClickSendMessage(message);
    return () => {
      handleLeave();
    };
  }, [title, userName, handleClickSendMessage]);

  const roomGuestList = (
    <div id={Number(peopleLimit) === 4 ? `room_guest_row_4` : `room_guest_row`}>
      {_.range(0, peopleLimit).map((_, idx) => (
        <div id={`roomguest-chatting-${idx}`}>
          <RoomGuest key={`roomGuest-${idx}`} idx={idx} value={{ host }} />
          <div id="chatting-balloon" style={{ display: "none" }}></div>
        </div>
      ))}
    </div>
  );

  return (
    <StyledWrapper>
      <div id="table-name">
        {`[ ${restaurantId}번 식당 - ${position}번 테이블 : ${title} (${num}명 / ${peopleLimit}명) ]`}
      </div>
      <TableSlide />
      {roomGuestList}
      <div id="footer">
        <Link to={"/restaurant/" + restaurantId}>
          <Door />
        </Link>
        <div id="switch">
          <SwitchMic value={{ rtcPeer: rtcPeer }}></SwitchMic>
          <SwitchVideo value={{ rtcPeer: rtcPeer }}></SwitchVideo>
        </div>
        <div id="chatting">
          <Chatting
            handleClickSendMessage={handleClickSendMessage}
            value={{ room: title, name: userName }}
          ></Chatting>
        </div>
      </div>
    </StyledWrapper>
  );
}
const StyledWrapper = styled.div`
  min-width: 1500px;
  #table-name {
    position: fixed;
    top: 4vh;
    margin-left: 160px;
    height: 2vh;
    font-family: "Jua";
    font-size: 20px;
    color: #82954b;
  }
  #room_guest_row {
    height: 80vh;
    margin: 0 5vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    align-content: center;
  }
  #room_guest_row_4 {
    height: 80vh;
    margin: 0 5vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    align-content: center;
  }
  #footer {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 7vh;
  }
  #switch {
    background-color: #fc6677;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 300px;
  }
  #chatting-balloon {
    position: absolute;
    width: 100px;
    min-height: 40px;
    height: auto;
    margin-top: 50px;
    background: #d6feff;
    border-radius: 10px;
    font-family: "Jua";
    white-space: normal;
    word-break: break-word;
    text-align: center;
  }
  #chatting-balloon:after {
    border-top: 15px solid #d6feff;
    border-left: 15px solid transparent;
    border-right: 0px solid transparent;
    border-bottom: 0px solid transparent;
    content: "";
    position: absolute;
    top: 10px;
    left: -15px;
  }
  #roomguest-chatting {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-start;
  }
`;
