import styled from "@emotion/styled";
import Menu from "components/common/nav/Menu";
import { Link } from "react-router-dom";
import logoimage from "assets/img/logo.png";

const Header = () => {
  return (
    <StyledWrapper>
      <div id="container">
        <Link to="/" >
          <div id="logo">
            <img src={ logoimage }  />
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
  a{
    text-decoration: none;
    color: #000000;
  }
  a:hover {
    color: #FF8E00;
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
  position: absolute;
  width: 100%;
`;