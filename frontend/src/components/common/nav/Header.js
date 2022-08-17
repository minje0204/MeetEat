import styled from "@emotion/styled";
import logoimage from "assets/img/logo.png";
import Menu from "components/common/nav/Menu";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <StyledWrapper>
      <div id="container">
        <div id="flex-box">
          <Link to="/">
            <div id="logo">
              <img src={logoimage} alt="로고" />
              <div id="logo_meeteat">밋잇</div>
            </div>
          </Link>
          <Menu />
        </div>
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
    text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb;
  }
  a:hover {
    color: #82954b;
  }
  img {
    width: 50px;
    height: 45px;
    display: inline-block;
  }
  #logo {
    display: flex;
    font-weight: 100;
    text-align: center;
    align-items: center;
    width: 150px;
  }
  #logo_meeteat {
    font-family: "Jua";
    font-size: 48px;
    width: 100px;
    text-align: center;
  }
  #container {
    padding: 2vh;
    position: ;
    display: block;
  }
  #flex-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
  }
  width: 100%;
`;
