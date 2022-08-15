import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function IndexPage() {
  console.log(window.sessionStorage.getItem("nickname"));
  const restaurantList = [
    {
      id: "1",
      source: "/images/index_page/restaurant_1.png",
      door_open: "/images/index_page/door1_open.png",
      door_closed: "/images/index_page/door1_closed.png",
    },
    {
      id: "2",
      source: "/images/index_page/restaurant_2.png",
      door_open: "/images/index_page/door2_open.png",
      door_closed: "/images/index_page/door2_closed.png",
    },
    {
      id: "3",
      source: "/images/index_page/restaurant_3.png",
      door_open: "/images/index_page/door3_open.png",
      door_closed: "/images/index_page/door3_closed.png",
    },
  ];
  const [open, setOpen] = useState(0);

  const listItems = restaurantList.map((e, idx) => (
    <div
      className={`image-container image-container${e.id}`}
      key={`restaurant${e.id}`}
    >
      <div
        id="image-box"
        onMouseOver={() => setOpen(e.id)}
        onMouseOut={() => setOpen(0)}
      >
        <Link to={"/restaurant/" + e.id}>
          <img src={e.source} id="image" alt={`restaurant-img-${idx}`}></img>

          <img
            src={e.door_open}
            className={`door${e.id}_open door`}
            alt="door"
            style={{ display: open === e.id ? "block" : "none" }}
          ></img>

          <img
            src={e.door_closed}
            className={`door${e.id}_closed door`}
            alt="door"
            style={{ display: open !== e.id ? "block" : "none" }}
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
cursor: url("/images/cursor_image.png"), auto;
img {
  cursor: url("/images/cursor_image.png"), auto;
  
}
  
.door {
  position: absolute;
  z-index: 100;
}
  .door1_open {
    bottom: -5.5%;
    width: 20%;
    left: 60%;
  }
  .door1_closed {
    bottom: 1.9%;
    width: 20%;
    left: 60%;
  }
  .door2_open {
    bottom: -9%;
    width: 26%;
    left: 37%;
  }
  .door2_closed {
    bottom: 1.3%;
    width: 26%;
    left: 37%;
  }
  .door3_open {
    bottom: -8.1%;
    width: 26%;
    left: 38%;
  }
  .door3_closed {
    bottom: 3.3%;
    width: 26%;
    left: 38%;
  }
  #restaurant-list {
    min-width: 904px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 3rem 3rem 0  3rem;
  }
  .image-container1 {
    
    width: 35%;
    position: relative;
  }
  .image-container2 {
    width: 32%;
    position: relative;
  }
  .image-container3 {
    width: 44%;
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
