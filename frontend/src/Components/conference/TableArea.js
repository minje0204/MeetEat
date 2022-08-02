import styled from "styled-components";
import ItemsOnTable from "./ItemsOnTable";
import { forwardRef } from "react";

const TableArea = forwardRef((props, ref) => {
  return (
    <StyledWrapper ref={ref}>
      {props.droppable ? "드롭 가능" : "드롭 불가능"}
      <ItemsOnTable></ItemsOnTable>
    </StyledWrapper>
  );
});
export default TableArea;
const StyledWrapper = styled.div`
  width: 860px;
  height: 480px;
  background: #705000;
`;
