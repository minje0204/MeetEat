import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import FormDialog from "components/makingroom/Modal";
import React, { useState } from "react";

export default function RestaurantPage() {
  let params = useParams();
  const tableList = [{ id: "1" }, { id: "2" }, { id: "3" }];
  const listItems = tableList.map(e => (
    <FormDialog
      tableNum={e.id}
      restaurantId={params.restaurant_id}
      key={`table${e.id}`}
    ></FormDialog>
  ));

  return (
    <StyledWrapper>
      <h1>식당{params.restaurant_id}</h1>
      <div id="table-list">{listItems}</div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
