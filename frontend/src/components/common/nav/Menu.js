import Button from "@mui/material/Button";
import styled from "styled-components";

export default function Menu() {
  return (
    <StyledWrapper>
      <Button
        variant="outlined"
        id="login-signup"
        size="small"
        sx={{ mx: "auto" }}
      >
        로그인
      </Button>
      <Button
        variant="outlined"
        id="login-signup"
        size="small"
        sx={{ mx: "auto" }}
      >
        회원가입
      </Button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  a {
    text-decoration: none;
  }

  button {
    font-family: "BlackHanSans";
    font-size: 1rem;
    color: black;
    padding: 0em 0.5em;
    border: 1px 1px 1px 1px;
    border-color: #e2dcc8;
    margin: 0px 4px;
    background-color: #fcf8e8;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
    transition: top 0.01s linear;
  }

  button:hover {
    background-color: #fff9ca;
  }

  #login-signup {
    font-family: "Mugunghwa";
    font-size: 30px;
    font-weight: bold;
  }
`;
