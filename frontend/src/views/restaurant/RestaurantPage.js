import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import Modal from "components/makingroom/Modal";
import React from "react";

export default function RestaurantPage() {
  let params = useParams();

  const tableList = [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" },
  { id: "5" }, { id: "6" }, { id: "7" }, { id: "8" }
  ];
  const listItems = tableList.map(e => (
    <Modal
      tableNum={e.id}
      restaurantId={params.restaurant_id}
      key={`table${e.id}`}
    ></Modal>
  ));

  return (
    <StyledWrapper>
      <div id="table-list">
        { listItems }
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  #table-list{
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    align-content: center;    
  }
`;
