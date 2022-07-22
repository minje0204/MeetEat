import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <StyledWrapper>
      <div id="restaurant-list">
        <Link to="/restaurant/a">
          <Button variant="outlined">식당A</Button>
        </Link>
        <Link to="/restaurant/b">
          <Button variant="outlined">식당B</Button>
        </Link>
        <Link to="/restaurant/c">
          <Button variant="outlined">식당C</Button>
        </Link>
      </div>
    </StyledWrapper>
  );
};
export default Main;

const StyledWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  #restaurant-list {
    width: 500px;
    display: flex;
    justify-content: space-between;
  }
`;
