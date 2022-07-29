import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import restaurant from "assets/img/restaurant.png";
import restaurant_2 from "assets/img/restaurant_2.png";
import burgershop from "assets/img/burgershop.png";

export default function IndexPage() {
  const restaurantList = [
    { id: "1", source: restaurant },
    { id: "2", source: restaurant_2 },
    { id: "3", source: burgershop },
  ];
  const listItems = restaurantList.map(e => (
    <Link to={"/restaurant/" + e.id} key={`restaurant${e.id}`}>
      <div id="image-box">
        <img src={e.source} width="450px" height="450px" id="image"></img>
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
}

const StyledWrapper = styled.div`
  height: 90vh;
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
    width: 80vw;
    display: flex;
    justify-content: space-between;
  }
  #image-box {
    display: flex-column;
    align-items: center;
    justify-content: center;
  }
  #image {
    max-width: 90%;
    max-height: 80%;
    -webkit-filter: brightness(90%);
    -webkit-transition: all 1s ease;
    -moz-transition: all 1s ease;
    -o-transition: all 1s ease;
    -ms-transition: all 1s ease;
    transition: all 1s ease;
  }
  #image:hover {
    -webkit-filter: brightness(110%);
  }
`;
