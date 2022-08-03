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
    text-shadow : 0 1px 0 #CCC, 0 2px 0 #C9C9C9, 0 3px 0 #BBB;
  }
  a:hover {
    color: #BABD42;
  }
  img {
    width: 50px;
    height: 45px;
    margin-right: 5px;
    display: inline-block;
  }
  #logo {
    display: flex;
    font-weight: 100;
    text-align: center;
    align-items: center;
  }
  #logo_meeteat {
    font-family: "Jua";
    font-size: 48px;
    margin-top: 6px;
    margin-left: -15px;
    width: 10vw;
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
