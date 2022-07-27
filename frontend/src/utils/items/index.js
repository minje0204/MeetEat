const tableItems = [
  {
    name: "스테이크",
    type: "silverware",
    imageurl:
      "https://www.newiki.net/w/images/thumb/8/8f/Grilled_porterhouse_steak.jpg/450px-Grilled_porterhouse_steak.jpg",
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
