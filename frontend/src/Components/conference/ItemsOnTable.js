import store from "app/store";
import styled from "styled-components";
import { useSelector } from "react-redux";

export default function ItemsOnTable() {
  const myMenu = useSelector(state => state.tableList); // 해당 state가 변할 때 마다 현재 컴포넌트를 리렌더링함.

  let startX = 0;
  let startY = 0;

  const dragEndHandler = e => {
    const box = store.getState().box;

    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    const index = e.target.attributes.index.value;
    const item = myMenu[index];
    if (
      0 < item.top + deltaY - item.height / 2 &&
      item.top + deltaY + item.height / 2 < box.height &&
      0 < item.left + deltaX - item.width / 2 &&
      item.left + deltaX + item.width / 2 < box.width
    ) {
      store.dispatch({
        type: "MOVE_ITEM",
        data: {
          index: index,
          deltaX: deltaX,
          deltaY: deltaY,
        },
      });
    }
  };
  const dragStartHandler = e => {
    startX = e.clientX;
    startY = e.clientY;
  };
  // console.log(store.getState());
  const menuRender = myMenu.map((menu, index) => (
    <div
      className="on-table"
      key={`tableitem-${index}`}
      index={index}
      style={{
        position: "absolute",
        width: menu.width,
        height: menu.height,
        top: menu.top - menu.height / 2, //아이템 중앙 기준
        left: menu.left - menu.width / 2, //아이템 중앙 기준
        backgroundImage: `url(${menu.imageurl})`,
        margin: 0,
      }}
      draggable="true"
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
    >
      <i
        className="fa-solid fa-circle-minus"
        onClick={() => store.dispatch({ type: "REMOVE_ITEM", data: { index } })}
      ></i>
    </div>
  ));
  return <StyledWrapper>{menuRender}</StyledWrapper>;
}

const StyledWrapper = styled.div`
   {
    position: absolute;
  }
  .on-table:hover {
    // filter: grayscale(50%);
    filter: brightness(70%);
    cursor: pointer;
  }

  i {
    position: absolute;
    right: 0;
    font-size: 1.5rem;
  }
  i:hover {
    color: red;
    filter: none;
  }
`;
