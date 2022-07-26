import styled from "@emotion/styled";
import Menu from "Components/common/nav/Menu";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <StyledWrapper>
      <div id="container">
        <Link to="/">
          <div id="logo">
            <span>혼밥러</span>
          </div>
        </Link>

        <Menu></Menu>
      </div>
    </StyledWrapper>
  );
};
export default Header;

const StyledWrapper = styled.div`
  #logo {
    font-size: 30px;
    font-weight: bold;
  }
  #container {
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }
  position: absolute;
  width: 100%;
`;
