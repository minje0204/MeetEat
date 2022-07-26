import Button from "@mui/material/Button";
import styled from "styled-components";

const Menu = () => {
  return (
    <StyledWrapper>
      <Button variant="outlined">로그인</Button>
      <Button variant="outlined">회원가입</Button>
    </StyledWrapper>
  );
};
export default Menu;

const StyledWrapper = styled.div``;
