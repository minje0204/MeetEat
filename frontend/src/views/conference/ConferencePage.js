import styled from "@emotion/styled";
import RoomGuest from "components/conference/RoomGuest";
import TableSlide from "components/conference/TableSlide";
import UseSocket from "hooks/UseSocket";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import _ from "lodash";

function Conference() {
  let params = useParams();
  const location = useLocation();
  const { title, people, userName } = location.state;
  const [num, setNum] = useState(1);
  const [chat, setChat] = useState("");

  const { handleClickSendMessage, readyState } = UseSocket({
    name: location.state.userName,
    setNum,
  });

  const handleChatMessage = (event) => {
    event.preventDefault();
    let message = {
      id: "sendChat",
      name: userName,
      room: title,
      chat: chat
    };
    handleClickSendMessage(message);
    setChat("");
  }

  useEffect(() => {
    let message = {
      id: "joinRoom",
      name: userName,
      room: title,
    };
    handleClickSendMessage(message);
  }, [title, userName, handleClickSendMessage]);

  const roomGuestList = (
    <div id="room_guest_row">
      {_.range(0, people).map((_, idx) => (
        <RoomGuest key={`roomGuest-${idx}`} idx={idx} />
      ))}
    </div>
  );

  return (
    <StyledWrapper>
      <h1>
        {`${params.conf_id}번 테이블 - ${title} (${num}명 / ${people}명)`}
        <button id="myAudioBtn">MyAudio off</button>
        <button id="myVideoBtn">MyVideo off</button>
        <input
          type="text" 
          value={chat}
          onChange={e => setChat(e.target.value)}
        />
        <button id="chatSend" onClick={handleChatMessage}>전송</button>
      </h1>
      <TableSlide></TableSlide>
      {roomGuestList}
    </StyledWrapper>
  );
}
export default Conference;
const StyledWrapper = styled.div`
  h1 {
    position: relative;
    top: 70px;
    left: 50px;
  }
  #room_guest_row {
    height: 90vh;
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    align-content: center;
  }
  #room_guest_row_4 {
    height: 90vh;
    margin: 0 10vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    align-content: center;
  }
`;
