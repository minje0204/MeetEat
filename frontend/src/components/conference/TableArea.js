import styled from "styled-components";
import ItemsOnTable from "./ItemsOnTable";
import { forwardRef } from "react";

const TableArea = forwardRef((props, ref) => {
  return (
    <StyledWrapper ref={ref}>
      <ItemsOnTable></ItemsOnTable>
    </StyledWrapper>
  );
});
export default TableArea;
const StyledWrapper = styled.div`
  width: 1000px;
  height: 600px;
  background: #705000;
`;