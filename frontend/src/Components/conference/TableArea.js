import styled from "styled-components";
import ItemsOnTable from "./ItemsOnTable";
import { useRef } from "react";
import store from "app/store";

export default function TableArea() {
  const table = useRef();
  console.log(table);
  const box = table.current.getBoundingClientRect();
  const data = {
    top: box.top,
    left: box.left,
    bottom: box.top + box.height,
    right: box.left + box.width,
  };
  store.dispatch({
    type: "GETBOUNDARY",
    data: data,
  });
  console.log("state", store.getState());
  return (
    <StyledWrapper>
      <ItemsOnTable></ItemsOnTable>
    </StyledWrapper>
  );
}
const StyledWrapper = styled.div`
  width: 700px;
  height: 400px;
  background: #705000;
`;
