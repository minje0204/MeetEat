import Button from "@mui/material/Button";
import styled from "styled-components";
import table_empty from "assets/img/table_empty.svg";
import table_alone from "assets/img/table_alone.svg";
import table_full from "assets/img/table_full.svg";

export default function Menu() {
  
  return (
    <StyledWrapper>
      <Button variant="outlined" id="login-signup" size="small" sx={{ mx: "auto" }}>로그인</Button>
      <Button variant="outlined" id="login-signup" size="small" sx={{ mx: "auto" }}>회원가입</Button>
    </StyledWrapper>
  );
};


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
  border-color: #E2DCC8;
  margin: 0px 4px;
  background-color: #FCF8E8;
  text-shadow: 0 1px 0 rgba(0,0,0,0.15);
  transition: top .01s linear;
}

button:hover {
  background-color: #FFF9CA;
}

  #login-signup {
    font-family: "Mugunghwa";
    font-size: 30px;
    font-weight: bold;
  }
`;
