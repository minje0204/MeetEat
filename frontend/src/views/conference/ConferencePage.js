// import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import TableSlide from "Components/conference/TableSlide";
import ItemTab from "Components/conference/ItemTab";

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
