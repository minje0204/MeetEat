import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import ModalMakingRoom from "components/makingroom/ModalMakingRoom";
import React from "react";
import { Link } from "react-router-dom";
import Door from "components/conference/Door";

export default function RestaurantPage() {
  let params = useParams();

  const tableList = [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
    { id: "7" },
    { id: "8" },
  ];
  const listItems = tableList.map(e => (
    <ModalMakingRoom
      tableNum={e.id}
      restaurantId={params.restaurant_id}
      key={`table${e.id}`}
    ></ModalMakingRoom>
  ));

  return (
    <StyledWrapper>
      <div id="restaurant-name">
        {`[ ${params.restaurant_id}번 식당 ]`}
      </div>
      <div id="table-list">{listItems}</div>
      <div id="exit">
        <Link to={ "/" }>
          <Door />
        </Link>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  #restaurant-name {
    position: fixed;
    top: 4vh;
    margin-left: 160px;
    height: 2vh;
    font-family: "Jua";
    font-size: 20px;
    color: #82954B;
  }
  #table-list {
    height: 85vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    align-content: center;
  }
  #exit {
    margin-left: 40px;
  }
`;
