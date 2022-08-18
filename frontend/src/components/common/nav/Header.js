import styled from "@emotion/styled";
import logoimage from "assets/img/logo_transparent.png";
import Menu from "components/common/nav/Menu";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  return (
    <StyledWrapper>
      <div id={location.pathname === "/" ? "header-background-blue" : "header-background-beige"}>
        <div id="container">
          <div id="flex-box">
            <Link to="/">
              <div id="logo">
                <img src={logoimage} alt="로고" />
                <div id="letter-box">
                  <div id="letter">밋잇</div>
                </div>
              </div>
            </Link>
            <Menu />
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  #header-background-blue {
    min-width: 1000px;
    width: 100%;
    height: 10vh;
    position: sticky;
    background-color: #e8f9fd;
  }
  #header-background-beige {
    min-width: 1000px;
    width: 100%;
    height: 10vh;
    position: sticky;
    background-color: #faf0d7;
  }

  a {
    text-decoration: none;
    color: #000000;
    text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb;
  }
  a:hover {
    color: #82954b;
  }
  #logo {
    display: flex;
    font-weight: 100;
    text-align: center;
    align-items: center;
    width: 200px;
    height: 8vh;
  }
  img {
    width: 90px;
    height: 60px;
    display: inline-block;
  }
  #container {
    padding: 2vh;
    display: block;
  }
  #flex-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
  }
  #letter-box {
    font-family: "Jua";
    font-size: 44px;
    width: 100px;
    text-shadow: 0 0.1em 20px #5bb318, 0.05em -0.03em 0 #5bb318,
      0.05em 0.005em 0 #5bb318, 0em 0.08em 0 #5bb318, 0.05em 0.08em 0 #5bb318,
      0px -0.03em 0 #5bb318, -0.03em -0.03em 0 #5bb318, -0.03em 0.08em 0 #5bb318,
      -0.03em 0 0 #5bb318;
  }
  #letter {
    display: inline-block;
    color: #ffe898;
  }
`;
