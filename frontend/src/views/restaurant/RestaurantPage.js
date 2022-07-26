import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { Link, useParams } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";
import React, { useState, useCallback, useEffect } from "react";

const Restaurant = () => {
  let params = useParams();

  const register = () => {
    //   name = document.getElementById("name").value;
    //   var room = document.getElementById("roomName").value;
    //   var message = {
    //     id: "joinRoom",
    //     name: name,
    //     room: room,
    //   };
    //   sendMessage(message);
  };
  const tableList = [{ id: "1" }, { id: "2" }, { id: "3" }];
  const listItems = tableList.map(e => (
    <Link
      to={"/restaurant/" + params.restaurant_id + "/conference/" + e.id}
      key={`conf-link-${e.id}`}
    >
      <Button variant="outlined" onClick={register}>
        컨퍼런스{e.id}
      </Button>
      <input type="text"></input>
    </Link>
  ));
  return (
    <StyledWrapper>
      <h1>식당{params.restaurant_id}</h1>
      <div id="table-list">{listItems}</div>
    </StyledWrapper>
  );
};
export default Restaurant;

const StyledWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
