import styled from "@emotion/styled";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "components/common/nav/Header";

export default function IndexPage() {
  const location = useLocation();
  useEffect(() => {
    if (location.state) {
      var { login } = location.state;
      if (!login) {
        login = true;
      }
    }
  }, [location.state]);
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
      <div id="background-img">
        <Header />
        <h1>
          <span>함</span>
          <span>께</span>
          <span>하</span>
          <span>고</span>
          <span>ㅤ</span>
          <span>싶</span>
          <span>은</span>
          <span>ㅤ</span>
          <span>식</span>
          <span>당</span>
          <span>을</span>
          <span>ㅤ</span>
          <span>클</span>
          <span>릭</span>
          <span>해</span>
          <span>ㅤ</span>
          <span>주</span>
          <span>세</span>
          <span>요</span>
          <span>!</span>
        </h1>
        <div className="container">
          <div id="restaurant-list">{listItems}</div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  max-height: 100vh;
  overflow: hidden;

  #background-img {
    height: 100vh;
    min-height: 100vh;
    background-image: url("/images/index_page/background.png");
    background-size: cover;
    width: 100vw;
  }
  #restaurant-list img {
    cursor: url("/images/cursor_image.png"), auto;
  }
  .container {
    overflow: hidden;
    display: block;
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
    cursor: url("/images/cursor_image.png"), auto;
    min-width: 904px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 6rem 3rem;
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

  h1 {
    display: flex;
    justify-content: center;
    font: bold 4vw/1.6 "Jua", sans-serif;
    user-select: none;
    height: 0.5vh;
    max-height: 0.2vh;
  }
  h1 span {
    display: inline-block;
    animation: float 1.4s ease-in-out infinite;
  }
  @keyframes float {
    0%,
    100% {
      transform: none;
    }
    33% {
      transform: translateY(-0.5px) rotate(-1deg);
    }
    66% {
      transform: translateY(0.5px) rotate(1deg);
    }
  }
  h1:hover span {
    animation: bounce 1s;
  }
  @keyframes bounce {
    0%,
    100% {
      transform: translate(0);
    }
    25% {
      transform: rotateX(20deg) translateY(2px) rotate(-3deg);
    }
    50% {
      transform: translateY(-20px) rotate(3deg) scale(1.1);
    }
  }

  span:nth-of-type(4n) {
    color: hsl(70, 50%, 50%);
    text-shadow: 1px 1px hsl(70, 45%, 45%), 2px 2px hsl(70, 45%, 45%),
      3px 3px hsl(70, 45%, 45%), 4px 4px hsl(70, 35%, 50%);
  }
  span:nth-of-type(4n-1) {
    color: hsl(50, 80%, 50%);
    text-shadow: 1px 1px hsl(50, 70%, 45%), 2px 2px hsl(50, 70%, 45%),
      3px 3px hsl(50, 70%, 45%), 4px 4px hsl(50, 70%, 50%);
  }
  span:nth-of-type(4n-2) {
    color: hsl(15, 90%, 70%);
    text-shadow: 1px 1px hsl(15, 80%, 60%), 2px 2px hsl(15, 80%, 60%),
      3px 3px hsl(15, 80%, 60%), 4px 4px hsl(14, 90%, 70%);
  }
  span:nth-of-type(4n-3) {
    color: hsl(348, 75%, 68%);
    text-shadow: 1px 1px hsl(348, 65%, 63%), 2px 2px hsl(348, 65%, 63%),
      3px 3px hsl(348, 65%, 63%), 4px 4px hsl(348, 55%, 68%);
  }

  h1 span:nth-of-type(2) {
    animation-delay: 0.05s;
  }
  h1 span:nth-of-type(3) {
    animation-delay: 0.1s;
  }
  h1 span:nth-of-type(4) {
    animation-delay: 0.15s;
  }
  h1 span:nth-of-type(5) {
    width: 1.5vw;
    animation-delay: 0.2s;
  }
  h1 span:nth-of-type(6) {
    animation-delay: 0.25s;
  }
  h1 span:nth-of-type(7) {
    animation-delay: 0.3s;
  }
  h1 span:nth-of-type(8) {
    width: 1.5vw;
    animation-delay: 0.35s;
  }
  h1 span:nth-of-type(9) {
    animation-delay: 0.4s;
  }
  h1 span:nth-of-type(10) {
    animation-delay: 0.45s;
  }
  h1 span:nth-of-type(11) {
    animation-delay: 0.5s;
  }
  h1 span:nth-of-type(12) {
    width: 1.5vw;
    animation-delay: 0.55s;
  }
  h1 span:nth-of-type(13) {
    animation-delay: 0.6s;
  }
  h1 span:nth-of-type(14) {
    animation-delay: 0.65s;
  }
  h1 span:nth-of-type(15) {
    animation-delay: 0.7s;
  }
  h1 span:nth-of-type(16) {
    width: 1.2vw;
    animation-delay: 0.75s;
  }
  h1 span:nth-of-type(17) {
    animation-delay: 0.8s;
  }
  h1 span:nth-of-type(18) {
    animation-delay: 0.85s;
  }
  h1 span:nth-of-type(19) {
    animation-delay: 0.9s;
  }
  h1 span:nth-of-type(20) {
    animation-delay: 0.95s;
  }
`;
