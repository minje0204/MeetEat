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
            <div id="logo_meeteat">밋잇</div>
          </div>
        </Link>
        <Menu />
      </div>
    </StyledWrapper>
  );
};
export default Header;

const StyledWrapper = styled.div`
  min-width: 1000px;
  a {
    text-decoration: none;
    color: #000000;
    text-shadow : 0 1px 0 #CCC, 0 2px 0 #C9C9C9, 0 3px 0 #BBB;
  }
  a:hover {
    color: #82954B;
  }
  img {
    width: 80px;
    height: 50px;
    display: inline-block;
  }
  #logo {
    display: flex;
    font-weight: 100;
    text-align: center;
    align-items: center;
    width: 170px;
  }
  #logo_meeteat {
    font-family: "Jua";
    font-size: 36px;
    width: 70px;
    height: 50px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }
  #container {
    height: 6vh;
    max-height: 6vh;
    padding: 2vh;
    position: static;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
  }
  position: static;
  width: 100%;
`;
