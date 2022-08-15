const tableItems = [
  {
    name: "steak",
    type: "western",
    imageurl: "/images/table_items/steak.png",
  },
  {
    name: "spoon_silver",
    type: "silverware",
    imageurl: "/images/table_items/spoon_silver.png",
  },
  {
    name: "spoon_gold",
    type: "silverware",
    imageurl: "/images/table_items/spoon_gold.png",
  },
  {
    name: "chopstick_silver",
    type: "silverware",
    imageurl: "/images/table_items/chopstick_silver.png",
  },
  {
    name: "chopstick_gold",
    type: "silverware",
    imageurl: "/images/table_items/chopstick_gold.png",
  },
  {
    name: "fork_silver",
    type: "silverware",
    imageurl: "/images/table_items/fork_silver.png",
  },
  {
    name: "fork_gold",
    type: "silverware",
    imageurl: "/images/table_items/fork_gold.png",
  },
  {
    name: "rice",
    type: "kfood",
    imageurl: "/images/table_items/rice.png",
  },
];

const itemCatType = {
  0: "silverware",
  1: "kfood",
  2: "jfood",
  3: "western",
};

const getItems = index => {
  let type = itemCatType[index];
  return tableItems.filter(item => item.type === type);
};

export default getItems;
