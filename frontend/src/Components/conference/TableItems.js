import { useState } from "react";

export default function TableItems(props) {
  const [tableDish, setTableDish] = useState([]);
  const [targets, setTargets] = useState([]);

  let posX = 0;
  let posY = 0;

  let originalX = 0;
  let originalY = 0;

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

  const tableDishHandler = item => {
    setTableDish([...tableDish, item]);
  };

  const dragStartHandler = e => {
    posX = e.clientX;
    posY = e.clientY;
    originalX = e.target.offsetLeft;
    originalY = e.target.offsetTop;
  };

  const dragHandler = e => {
    e.target.style.left = `${e.target.offsetLeft + e.clientX - posX}px`;
    e.target.style.top = `${e.target.offsetTop + e.clientY - posY}px`;
    posY = e.clientY;
    posX = e.clientX;
  };

  const dragEndHandler = e => {
    setTargets(targets => {
      const newTargets = [...targets];
      newTargets.push({
        id: parseInt(e.timeStamp),
        top: e.target.offsetTop + e.clientY - posY,
        left: e.target.offsetLeft + e.clientX - posX,
        details: e.target.id,
      });
      console.log(newTargets);
      return newTargets;
    });

    e.target.style.left = `${originalX}px`;
    e.target.style.top = `${originalY}px`;
  };

  const rendering = idx => {
    const result = [];
    if (idx === 0) {
      for (let i = 0; i < tableItems.length; i++) {
        if (tableItems[i].type === "silverware") {
          result.push(
            <span
              key={i}
              id={tableItems[i].name}
              onClick={() => tableDishHandler(tableItems[i].name)}
              draggable="True"
              onDragStart={dragStartHandler}
              onDrag={dragHandler}
              onDragEnd={dragEndHandler}
            >
              {tableItems[i].name}
            </span>,
          );
          result.push(<br></br>);
        }
      }
    } else if (idx === 1) {
      for (let i = 0; i < tableItems.length; i++) {
        if (tableItems[i].type === "kfood") {
          result.push(
            <span
              key={i}
              onClick={() => tableDishHandler(tableItems[i].name)}
              draggable="True"
            >
              {tableItems[i].name}
            </span>,
          );
          result.push(<br></br>);
        }
      }
    } else if (idx === 2) {
      for (let i = 0; i < tableItems.length; i++) {
        if (tableItems[i].type === "jfood") {
          result.push(
            <span
              key={i}
              onClick={() => tableDishHandler(tableItems[i].name)}
              draggable="True"
            >
              {tableItems[i].name}
            </span>,
          );
          result.push(<br></br>);
        }
      }
    } else if (idx === 3) {
      for (let i = 0; i < tableItems.length; i++) {
        if (tableItems[i].type === "western") {
          result.push(
            <span
              key={i}
              onClick={() => tableDishHandler(tableItems[i].name)}
              draggable="True"
            >
              {tableItems[i].name}
            </span>,
          );
          result.push(<br></br>);
        }
      }
    }

    return result;
  };

  return (
    <div id="table-items">
      {rendering(props.tabSelect)}
      선택된 것들 : {tableDish}
    </div>
  );
}
