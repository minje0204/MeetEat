import store from "app/store";
import { useEffect } from "react";
import styled from "styled-components";

export default function ItemsOnTable(props) {
  const { item } = props;
  const myMenu = store.getState().tableList;

  const menuRender = myMenu.map((menu, index) => (
    <div
      key={`tableitem-${index}`}
      style={{
        position: "absolute",
        width: menu.width,
        height: menu.height,
        top: menu.top - menu.height / 2,
        left: menu.left - menu.width / 2,
        backgroundImage: `url(${menu.imageurl})`,
        margin: 0,
      }}
    >
      <button
        // style={{
        //   position: "absolute",
        // }}
        onClick={() => store.dispatch({ type: "REMOVEITEM", data: { index } })}
      >
        삭제
      </button>
      {/* <img
        key={`tableitem-${index}`}
        src={menu.imageurl}
        // style={{
        //   position: "absolute",
        //   top: menu.top,
        //   left: menu.left,
        // }}
      ></img> */}
    </div>
  ));

  return (
    <div
      style={{
        position: "absolute",
      }}
    >
      {menuRender}
    </div>
  );
}
