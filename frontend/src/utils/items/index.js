import { useEffect } from "react";
import Axios from "utils/axios/Axios";

let tableItems = [
  { name: "steak", type: "western", imageUrl: "/images/table_items/steak.png" },
  {
    name: "spoon_silver",
    type: "silverware",
    imageUrl: "/images/table_items/spoon_silver.png",
  },
  {
    name: "spoon_gold",
    type: "silverware",
    imageUrl: "/images/table_items/spoon_gold.png",
  },
  {
    name: "chopstick_silver",
    type: "silverware",
    imageUrl: "/images/table_items/chopstick_silver.png",
  },
  {
    name: "chopstick_gold",
    type: "silverware",
    imageUrl: "/images/table_items/chopstick_gold.png",
  },
  {
    name: "fork_silver",
    type: "silverware",
    imageUrl: "/images/table_items/fork_silver.png",
  },
  {
    name: "fork_gold",
    type: "silverware",
    imageUrl: "/images/table_items/fork_gold.png",
  },
  {
    name: "rice",
    type: "kfood",
    imageUrl: "/images/table_items/rice.png",
  },
  {
    name: "cup_noodle",
    type: "kfood",
    imageUrl: "/images/table_items/cup_noodle.png",
  },
  {
    name: "kimbab",
    type: "kfood",
    imageUrl: "/images/table_items/kimbab.png",
  },
  {
    name: "kimchi",
    type: "kfood",
    imageUrl: "/images/table_items/kimchi.png",
  },
  {
    name: "egg_sushi",
    type: "jfood",
    imageUrl: "/images/table_items/egg_sushi.png",
  },
  {
    name: "salmon_sushi",
    type: "jfood",
    imageUrl: "/images/table_items/salmon_sushi.png",
  },
  {
    name: "shrimp_sushi",
    type: "jfood",
    imageUrl: "/images/table_items/shrimp_sushi.png",
  },
  {
    name: "tuna_sushi",
    type: "jfood",
    imageUrl: "/images/table_items/tuna_sushi.png",
  },
];

const itemCatType = {
  0: "silverware",
  1: "kfood",
  2: "jfood",
  3: "western",
};

const getItems = index => {
  // Axios.get("/tray/items").then(res => {
  //   tableItems = res.data.response;
  // });
  let type = itemCatType[index];
  return tableItems.filter(item => item.type === type);
};

export default getItems;
