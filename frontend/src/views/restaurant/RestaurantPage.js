import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import ModalMakingRoom from "components/makingroom/ModalMakingRoom";
import React from "react";
import { Link } from "react-router-dom";
import Door from "components/conference/Door";
import Axios from "utils/axios/Axios";
import { useEffect, useState } from "react";

export default function RestaurantPage() {
  let params = useParams();
  const [tableList, setTableList] = useState([]);

  function onload(data) {
    let onTableList = [
      { position: "1" },
      { position: "2" },
      { position: "3" },
      { position: "4" },
      { position: "5" },
      { position: "6" },
      { position: "7" },
      { position: "8" },
    ];
    for (let i = 0; i < data.length; i++) {
      let table = data[i];
      onTableList[table.position - 1] = table;
    }
    setTableList(onTableList);
  };

  useEffect(() => {
    Axios.get(`/restaurant/${encodeURI(params.restaurant_id)}`)
      .then(response => onload(response.data.response))
      .catch(e => console.log(e));
  }, [params.restaurant_id]);

  const listItems = tableList.map(e => (
    <ModalMakingRoom
      restaurantId={params.restaurant_id}
      tableInfo={e}
      key={`table${e.position}`}
    ></ModalMakingRoom>
  ));

  return (
    <StyledWrapper>
      <div id="restaurant-name">{`[ ${params.restaurant_id}번 식당 ]`}</div>
      <div id="table-list">{listItems}</div>
      <div id="exit">
        <Link to={"/"}>
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
    color: #82954b;
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
