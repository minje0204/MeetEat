// import styled from "@emotion/styled";
import { useParams, useLocation } from "react-router-dom";
import TableSlide from "components/conference/TableSlide";
import RoomGuests from "components/conference/RoomGuests";

function Conference() {
  let params = useParams();

  const location = useLocation();
  const title = location.state.title;
  const people = location.state.people;

  return (
    <div>
      {/* <h1>
        컨퍼런스{params.conf_id} - {title} (현재인원수/{people}명)
      </h1> */}
      <TableSlide></TableSlide>
      <RoomGuests people={people}></RoomGuests>
    </div>
  );
}
export default Conference;
