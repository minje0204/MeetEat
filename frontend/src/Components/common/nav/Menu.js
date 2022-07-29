import Button from "@mui/material/Button";
import styled from "styled-components";

const Menu = () => {
  return (
    <StyledWrapper>
      <Button variant="outlined" id="login-signup" size="small" sx={{ mx: "auto" }}>로그인</Button>
      <Button variant="outlined" id="login-signup" size="small" sx={{ mx: "auto" }} >회원가입</Button>
    </StyledWrapper>
  );
};
export default Menu;

const StyledWrapper = styled.div`

a {
  text-decoration: none;
}

button {
  font-family: "BlackHanSans";
  font-size: 32px;
  color: black;
}

  #login-signup {
    font-family: "Mugunghwa";
    font-size: 30px;
    font-weight: bold;
  }
`;
