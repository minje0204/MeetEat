import styled from "styled-components";
import ItemsOnTable from "./ItemsOnTable";
import { useEffect, useRef } from "react";
import store from "app/store";

export default function TableArea() {
  const table = useRef(null);
  // console.log(table);

  function getBoundary() {
    if (table.current) {
      const box = table.current.getBoundingClientRect();
      const data = {
        top: box.top,
        left: box.left,
        bottom: box.top + box.height,
        right: box.left + box.width,
        height: box.height,
        width: box.width,
      };
      store.dispatch({
        type: "GET_BOUNDARY",
        data: data,
      });
    }
  }
  getBoundary();

  // const table = useRef();
  // useEffect(() => {
  //   // console.log(table);
  // if (table.current) {
  //   console.log(table.current);
  //   const box = table.current.getBoundingClientRect();

  //   const data = {
  //     top: box.top,
  //     left: box.left,
  //     bottom: box.top + box.height,
  //     right: box.left + box.width,
  //     height: box.height,
  //     width: box.width,
  //   };
  //   store.dispatch({
  //     type: "GET_BOUNDARY",
  //     data: data,
  //   });
  // }
  // console.log("state", store.getState());
  // });
  return (
    <StyledWrapper ref={table}>
      <ItemsOnTable></ItemsOnTable>
    </StyledWrapper>
  );
}
const StyledWrapper = styled.div`
  width: 1000px;
  height: 600px;
  background: #705000;
`;
