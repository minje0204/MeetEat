import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import restaurant from "assets/img/restaurant.png";
import restaurant_2 from "assets/img/restaurant_2.png";
import burgershop from "assets/img/burgershop.png";

const IndexPage = () => {
  const restaurantList = [
    { id: "1", source: restaurant },
    { id: "2", source: restaurant_2 },
    { id: "3", source: burgershop },
  ];
  const listItems = restaurantList.map(e => (
    <Link to={"/restaurant/" + e.id}>
      <div>
        <img src={e.source} width="450px" height="450px"></img>
        <Button variant="text">식당 {e.id}</Button>
      </div>
    </Link>
  ));
  return (
    <StyledWrapper>
     <div id=""></div>
      <div id="restaurant-list">{listItems}</div>
    </StyledWrapper>
  );
};
export default IndexPage;

const StyledWrapper = styled.div`
  bgcolor: ;
  height: 100vh;
  display: flex;
  
  justify-content: center;
  align-items: center;
  text-align: center;

  a {
    text-decoration: none;
  }
  
  button {
    font-family: "BlackHanSans";
    font-size: 32px;
    color: black;
  }
  
  #restaurant-list {
    width: 1500px;
    display: flex;
    justify-content: space-between;
  }
`;
