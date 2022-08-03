import Button from "@mui/material/Button";
import styled from "styled-components";
import ModalFriends from "components/friends/ModalFriends";

export default function Menu() {
  return (
    <StyledWrapper>
      <ModalFriends />
      <Button
        variant="outlined"
        size="small"
        sx={{ mx: "auto" }}
      >
        로그인
      </Button>
      <Button
        variant="outlined"
        size="small"
        sx={{ mx: "auto" }}
      >
        회원가입
      </Button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  
  a {
    text-decoration: none;
  }
  button {
    font-family: "Jua";
    font-size: 24px;
    color: black;
    padding: 0em 0.5em;
    border-width: 1px;
    border-color: #e2dcc8;
    margin: 0px 4px;
    background-color: #FFEF82;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
    transition: top 0.01s linear;
  }
  button:hover {
    background-color: #EFD345;
  }

`;
