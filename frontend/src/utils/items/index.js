import { useEffect } from "react";
import Axios from "utils/axios/Axios";

  let tableItems = [];

  const itemCatType = {
    0: "silverware",
    1: "kfood",
    2: "jfood",
    3: "western",
  };


const getItems = index => {
  Axios.get("/tray/items").then(res => {
    tableItems = res.data.response;
  })
  let type = itemCatType[index];
  return tableItems.filter(item => item.type === type);
};

export default getItems;
