import styled from "@emotion/styled";
import { useParams, useNavigate } from "react-router-dom";
import ModalMakingRoom from "components/makingroom/ModalMakingRoom";
import React from "react";
import { Link } from "react-router-dom";
import Door from "components/conference/Door";
import Axios from "utils/axios/Axios";
import { useEffect, useState } from "react";
import Header from "components/common/nav/Header";
import { isLogin } from "utils/account/GetAccess";
import { toast } from "react-toastify";
import restaurantName from "utils/conference/conferenceName";

export default function RestaurantPage() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin()) {
      toast.error("🦄 로그인이 필요합니다. ", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });

      navigate("/", {
        state: {
          login: false,
        },
      });
    }
  }, [navigate]);
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
  }

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
      <Header />
      <div id="restaurant-name">{`[ ${
        restaurantName[params.restaurant_id]
      } ]`}</div>
      <div id="restaurant-background">
        <div id="table-list">{listItems}</div>
        <div id="exit">
          <Link to={"/"}>
            <Door />
          </Link>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  overflow: hidden;

  #restaurant-background {
    background-color: #faf0d7;
    height: 90vh;
  }
  #restaurant-name {
    position: absolute;
    top: 5vh;
    margin-left: 200px;
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
