import styled from "styled-components";
import ItemsOnTable from "./ItemsOnTable";
import { forwardRef } from "react";

const TableArea = forwardRef((props, ref) => {
  const { getDroppable, isDragging, ...other } = props;
  return (
    <StyledWrapper>
      <div id="table" className="droppable-area" ref={ref}>
        <ItemsOnTable
          getDroppable={getDroppable}
          isDragging={isDragging}
          {...other}
        ></ItemsOnTable>
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
