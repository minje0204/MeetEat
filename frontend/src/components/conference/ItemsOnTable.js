import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useEffect, useState } from "react";
import { MoveItem, RemoveItem } from "modules/table";
import { useSocketContext } from "components/socket/SocketContext";
import { useConferenceContext } from "components/conference/ConferenceContext";

export default function ItemsOnTable(props) {
  const myMenu = useSelector(state => state.table.present.tableList); // 해당 state가 변할 때 마다 현재 컴포넌트를 리렌더링함.
  const { sendMessage } = useSocketContext();
  const { userName, roomTitle } = useConferenceContext();
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    let msg = {
      id: "updateTable",
      name: userName,
      room: roomTitle,
      data: myMenu,
    };
    sendMessage(msg);
  }, [myMenu]);
  const getStartX = value => {
    setStartX(value);
  };
  const getStartY = value => {
    setStartY(value);
  };
  const dragStartHandler = e => {
    getStartX(e.clientX);
    getStartY(e.clientY);
  };

  const box = useSelector(state => state.box.box);
  const dragHandler = e => {
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
      props.getDroppable(true);
    } else {
      props.getDroppable(false);
    }
  };

  const dragEndHandler = e => {
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
      dispatch(
        MoveItem({
          index: index,
          deltaX: deltaX,
          deltaY: deltaY,
        }),
      );
      let msg = {};
      // sendMessage(msg);
    }
  };
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
      onDragStart={e => {
        dragStartHandler(e);
      }}
      onDrag={e => {
        props.isDragging(true);
        dragHandler(e);
      }}
      onDragEnd={e => {
        dragEndHandler(e);
        props.isDragging(false);
      }}
    >
      <i
        className="fa-solid fa-circle-minus"
        onClick={() => {
          dispatch(RemoveItem(index));
        }}
      ></i>
    </div>
  ));
  return (
    <StyledWrapper>
      <DndProvider backend={HTML5Backend}> {menuRender}</DndProvider>
    </StyledWrapper>
  );
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
