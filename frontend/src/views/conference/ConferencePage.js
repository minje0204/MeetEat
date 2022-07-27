// import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import TableSlide from "components/conference/TableSlide";

function Conference() {
  let params = useParams();
  return (
    <div>
      <h1>컨퍼런스{params.conf_id}</h1>
      <TableSlide></TableSlide>
    </div>
  );
}
export default Conference;
