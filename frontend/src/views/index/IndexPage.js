import styled from "@emotion/styled";
import burgershop from "assets/img/burgershop.png";
import restaurant from "assets/img/restaurant.png";
import restaurant_2 from "assets/img/restaurant_2.png";
import door_open from "assets/img/door_open.png";
import door_closed from "assets/img/door_closed.png";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function IndexPage() {
  const restaurantList = [
    {
      id: "1",
      source: restaurant,
      door_open: door_open,
      door_closed: door_closed,
    },
    {
      id: "2",
      source: restaurant_2,
      door_open: door_open,
      door_closed: door_closed,
    },
    {
      id: "3",
      source: burgershop,
      door_open: door_open,
      door_closed: door_closed,
    },
  ];
  const [open, setOpen] = useState(false);

  const listItems = restaurantList.map((e, idx) => (
    <div className="image-container" key={`restaurant${e.id}`}>
      <div
        id="image-box"
        onMouseOver={() => {
          setOpen(true);
        }}
        onMouseOut={() => setOpen(false)}
      >
        <Link to={"/restaurant/" + e.id}>
          <img src={e.source} id="image" alt={`restaurant-img-${idx}`}></img>

          <img
            src={e.door_open}
            id="door_open"
            alt="door"
            style={{ display: open ? "block" : "none" }}
          ></img>

          <img
            src={e.door_closed}
            id="door_closed"
            alt="door"
            style={{ display: !open ? "block" : "none" }}
          ></img>
        </Link>
      </div>
    </div>
  ));
  return (
    <StyledWrapper>
      <div id="restaurant-list">{listItems}</div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  #door_open {
    position: absolute;
    z-index: 100;
    bottom: -8.5%;
    width: 26%;
    left: 37%;
  }
  #door_closed {
    position: absolute;
    z-index: 100;
    bottom: 1.7%;
    width: 26%;
    left: 37%;
  }
  #restaurant-list {
    min-width: 904px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 3rem;
  }
  .image-container {
    width: 33%;
    position: relative;
  }
  #image-box {
    width: 100%;
  }
  #image {
    width: 100%;
  }
  button {
    font-family: "Jua";
    font-size: 32px;
    color: black;
  }
  }
  #restaurant-name {
    width: 100%;
  }
`;
