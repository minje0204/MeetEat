import styled from "@emotion/styled";
import Menu from "components/common/nav/Menu";
import { Link } from "react-router-dom";
import logoimage from "assets/img/logo.png";
import Location from "components/common/nav/Location"

const Header = () => {
  return (
    <StyledWrapper>
      <div id="container">
        <div id="container-logo-location">
          <Link to="/" >
            <div id="logo">
              <img src={ logoimage } />
              <div>혼밥러</div>
            </div>
          </Link>
          <Location></Location>
        </div>
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
    text-shadow: 0 3px 0 rgba(0,0,0,0.15);
  }
  a:hover {
    color: #293462;
  }
  img {
    width:50px;
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
    
    padding:10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
  }
  #container-logo-location {
    display: flex;
    align-items: center;
  }
  position: absolute;
  width: 100%;
`;