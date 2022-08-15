import { useSelector } from "react-redux";
import styled from "styled-components";
import { Button } from "@mui/material";

export default function SaveTable() {
  const myMenu = useSelector(state => state.table.present.tableList);

  const onSave = () => {
    console.log(myMenu);
  };
  return (
    <StyledWrapper>
      <Button onClick={onSave}>저장</Button>
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
