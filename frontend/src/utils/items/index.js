const tableItems = [
  { name: "숟가락", type: "silverware" },
  { name: "젓가락", type: "silverware" },
  { name: "김치", type: "kfood" },
  { name: "된장찌개", type: "kfood" },
  { name: "스시", type: "jfood" },
  { name: "돈까스", type: "jfood" },
  { name: "스테이크", type: "western" },
  { name: "피자", type: "western" },
];

const itemCatType = {
  0: "silverware",
  1: "kfood",
  2: "western",
};

const getItems = index => {
  let type = itemCatType[index];
  return tableItems.filter(item => item.type === type);
};

export default getItems;
