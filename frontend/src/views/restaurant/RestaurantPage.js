import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import FormDialog from "Components/makingroom/Modal";
import React, { useState } from "react";

const Restaurant = () => {
  let params = useParams();
  const tableList = [{ id: "1" }, { id: "2" }, { id: "3" }];
  const listItems = tableList.map(e => (
    <div>
      <FormDialog
        tableNum={e.id}
        restaurantId={params.restaurant_id}
      ></FormDialog>
    </div>
  ));

  return (
    <StyledWrapper>
      <h1>식당{params.restaurant_id}</h1>
      <div id="table-list">{listItems}</div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
