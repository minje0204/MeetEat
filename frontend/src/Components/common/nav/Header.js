import styled from "@emotion/styled";
import logoimage from "assets/img/logo.png";
import Menu from "components/common/nav/Menu";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <StyledWrapper>
      <div id="container">
        <Link to="/">
          <div id="logo">
            <img src={logoimage} alt="로고" />
            <div>혼밥러</div>
          </div>
        </Link>
        <Menu></Menu>
      </div>
    </StyledWrapper>
  );
};
export default Header;

const StyledWrapper = styled.div`
  a {
    text-decoration: none;
    color: #000000;
    text-shadow: 0 3px 0 rgba(0, 0, 0, 0.15);
  }
  a:hover {
    color: #ff8e00;
  }
  img {
    width: 50px;
    height: 45px;
    margin-right: 5px;
    display: inline-block;
  }
  #logo {
    display: flex;
    font-family: "Ulsan";
    font-size: 40px;
    font-weight: 100;
    text-align: center;
    align-items: center;
  }
  #container {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
  }
  position: absolute;
  width: 100%;
`;
