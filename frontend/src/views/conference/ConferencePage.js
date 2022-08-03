import styled from "@emotion/styled";
import RoomGuest from "components/conference/RoomGuest";
import TableSlide from "components/conference/TableSlide";
import UseSocket from "hooks/UseSocket";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import _ from "lodash";
import SwitchMic from "components/conference/SwitchMic";
import SwitchVideo from "components/conference/SwitchVideo";

function Conference() {
  let params = useParams();
  const location = useLocation();
  const { title, people, userName } = location.state;
  const [num, setNum] = useState(1);

  /* eslint-disable no-unused-vars */
  const { handleClickSendMessage, readyState } = UseSocket({
    name: location.state.userName,
    setNum,
  });

  useEffect(() => {
    let message = {
      id: "joinRoom",
      name: userName,
      room: title,
    };
    handleClickSendMessage(message);
  }, [title, userName, handleClickSendMessage]);

  const roomGuestList = (
    <div id={ Number(people) === 4 ? `room_guest_row_4` : `room_guest_row` }>
      {_.range(0, people).map((_, idx) => (
        <RoomGuest key={`roomGuest-${idx}`} idx={idx} />
      ))}
    </div>
  );

  return (
    <StyledWrapper>
      <div id="table-name">
        {`[ ${params.conf_id}번 테이블 - ${title} (${num}명 / ${people}명) ]`}
      </div>
      <TableSlide></TableSlide>
      {roomGuestList}
      <div id="footer">
        <div id="switch">
          <SwitchMic />
          <SwitchVideo />
        </div>
      </div>
    </StyledWrapper>
  );
}
export default Conference;
const StyledWrapper = styled.div`
  #table-name {
    position: relative;
    height: 3vh;
    margin-left: 1vw;
  }
  #room_guest_row {
    height: 80vh;
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    align-content: center;
  }
  #room_guest_row_4 {
    height: 80vh;
    margin: 0 10vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    align-content: center;
  }
  #footer {
    display: flex;
    align-items: center;
    height: 7vh;
  }
  #switch {
    background-color: #FC6677;
    display: flex;
  }
`;
