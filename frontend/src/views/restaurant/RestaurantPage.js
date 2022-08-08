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
  #table-list {
    height: 85vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    align-content: center;
  }
  #exit {
    margin-left: 70px;
  }
`;
