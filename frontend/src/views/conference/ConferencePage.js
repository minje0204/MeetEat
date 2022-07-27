// import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import TableSlide from "Components/conference/TableSlide";
import UseSocket from "hooks/UseSocket";
function Conference() {
  let params = useParams();
  return (
    <div>
      <h1>컨퍼런스{params.conf_id}</h1>
      <TableSlide></TableSlide>
      <UseSocket></UseSocket>
    </div>
  );
}
export default Conference;
