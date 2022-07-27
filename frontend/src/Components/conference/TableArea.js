import styled from "styled-components";
import ItemsOnTable from "./ItemsOnTable";
import { useRef, useEffect, useState } from "react";
import store from "app/store";
import { isEqual } from "lodash";

export default function TableArea() {
  const [items, SetItems] = useState([store.getState().tableList]);
  const table = useRef(null);

  function getBoundary() {
    if (table.current) {
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
    }
  }
  getBoundary();
  // store.subscribe(() => {
  //   let prev = items;
  //   let next = store.getState().tableList;
  //   console.log(items);
  //   console.log(next);
  //   console.log(!isEqual(prev, next));
  //   if (!isEqual(prev, next)) {
  //     // SetItems(next);
  //   }
  // });

  // SetItems(store.getState());
  return (
    <StyledWrapper id="table-area" ref={table}>
      {items.length === 0 && <ItemsOnTable></ItemsOnTable>}
      <ItemsOnTable></ItemsOnTable>
    </StyledWrapper>
  );
}
const StyledWrapper = styled.div`
  width: 700px;
  height: 400px;
  background: #705000;
`;
