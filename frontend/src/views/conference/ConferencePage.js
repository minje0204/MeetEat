import styled from "@emotion/styled";
import RoomGuest from "components/conference/RoomGuest";
import TableSlide from "components/conference/TableSlide";
import UseSocket from "hooks/UseSocket";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import _ from "lodash";

function Conference() {
  const location = useLocation();
  const { title, people, name } = location.state;
  const { handleClickSendMessage, readyState } = UseSocket(
    { name: location.state.name },
    title,
  );

  useEffect(() => {
    let message = {
      id: "joinRoom",
      name: name,
      room: title,
    };
    handleClickSendMessage(message);
  }, [title, name, handleClickSendMessage]);

  const roomGuestList = (
    <div id="room_guest_row">
      {_.range(0, people).map((_, idx) => (
        <RoomGuest key={`roomGuest-${idx}`} />
      ))}
    </div>
  );

  return (
    <StyledWrapper>
      {/* <h1>
        컨퍼런스{params.conf_id} - {title} (현재인원수/{people}명)
      </h1> */}
      <TableSlide></TableSlide>
      {roomGuestList}
    </StyledWrapper>
  );
}
export default Conference;
const StyledWrapper = styled.div`
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
