const tableItems = [
  {
    name: "스테이크",
    type: "western",
    imageurl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoQXZKReGnXIqCplBaunAiFCl7FNCxfvYFP6ELoNOdRozuVrxIo0MIL7onAOG4l7Ydo6Y&usqp=CAU",
  },
  {
    name: "숟가락",
    type: "silverware",
    imageurl:
      "https://w7.pngwing.com/pngs/71/394/png-transparent-spoon-spoon-brew-style-luxury-thumbnail.png",
  },
  {
    name: "젓가락",
    type: "silverware",
    imageurl:
      "http://jubang25.co.kr/web/product/medium/202104/d8b0536ddf995cbc5235a5709b8aa877.jpg",
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
