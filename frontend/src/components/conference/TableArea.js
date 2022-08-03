import styled from "styled-components";
import ItemsOnTable from "./ItemsOnTable";
import { forwardRef } from "react";

const TableArea = forwardRef((props, ref) => {
  return (
    <StyledWrapper>
      <div id="table" className="droppable-area" ref={ref}>
        <ItemsOnTable
          getDroppable={props.getDroppable}
          isDragging={props.isDragging}
        ></ItemsOnTable>
        {/* {props.dragging ? "드래그 중" : "드래그 중 아님"}
        {props.droppable ? "드롭 가능" : "드롭 불가능"} */}
      </div>
      {!props.dragging || props.droppable || (
        <div id="disable" className="droppable-area"></div>
      )}
    </StyledWrapper>
  );
});
export default TableArea;
const StyledWrapper = styled.div`
   {
    width: 940px;
    height: 400px;
    position: relative;
  }
  .droppable-area {
    position: absolute;
    width: 940px;
    height: 400px;
  }
  #table {
    background: #b97a56;
  }
  #disable {
    background: red;
    opacity: 30%;
    z-index: 200;
  }
`;
