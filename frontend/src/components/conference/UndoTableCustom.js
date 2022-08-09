import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Button } from "@mui/material";
import { ActionCreators } from "redux-undo";

export default function UndoTableCustom() {
  const canUndo = useSelector(state => state.table.past.length);
  const canRedo = useSelector(state => state.table.future.length);
  const dispatch = useDispatch();
  const undo = () => {
    dispatch(ActionCreators.undo());
  };
  const redo = () => {
    dispatch(ActionCreators.redo());
  };
  return (
    <StyledWrapper>
      <Button onClick={undo} disabled={!canUndo}>
        되돌리기
      </Button>
      <Button onClick={redo} disabled={!canRedo}>
        다시 실행
      </Button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
    font-family: "Jua";
    font-size: 24px;
    color: black;
    padding: 0em 0.5em;
    border-width: 1px;
    border-color: #babd42;
    margin: 0px 4px;
    background-color: #babd42;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
    transition: top 0.01s linear;
  }
  button:hover {
    background-color: #82954b;
  }
`;
