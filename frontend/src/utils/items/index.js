const tableItems = [
  {
    name: "steak",
    type: "western",
    imageurl: "/images/steak.png",
  },
  {
    name: "spoon_silver",
    type: "silverware",
    imageurl: "/images/spoon_silver.png",
  },
  {
    name: "spoon_gold",
    type: "silverware",
    imageurl: "/images/spoon_gold.png",
  },
  {
    name: "chopstick_silver",
    type: "silverware",
    imageurl: "/images/chopstick_silver.png",
  },
  {
    name: "chopstick_gold",
    type: "silverware",
    imageurl: "/images/chopstick_gold.png",
  },
  {
    name: "fork_silver",
    type: "silverware",
    imageurl: "/images/fork_silver.png",
  },
  {
    name: "fork_gold",
    type: "silverware",
    imageurl: "/images/fork_gold.png",
  },
  {
    name: "rice",
    type: "kfood",
    imageurl: "/images/rice.png",
  },

  // { name: "젓가락", type: "silverware" },
  // { name: "김치", type: "kfood" },
  // { name: "된장찌개", type: "kfood" },
  // { name: "스시", type: "jfood" },
  // { name: "돈까스", type: "jfood" },
  // { name: "스테이크", type: "western" },
  // { name: "피자", type: "western" },
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
