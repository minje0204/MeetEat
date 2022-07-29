import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import getItems from "utils/items";
import store from "app/store";
import styled from "styled-components";
import { useState } from "react";

export default function ItemTabPanel(props) {
  const { index, isActive, ...other } = props;

  let posX = 0;
  let posY = 0;

  // let originalX = 0;
  // let originalY = 0;

  let imageWidth = 0;
  let imageHeight = 0;

  const dragStartHandler = e => {
    const img = new Image();
    img.src = e.target.src;

    // img.alt = "image";
    // img.key = e.target.key;
    e.dataTransfer.setDragImage(img, img.width * 0.5, img.height * 0.5);
    posX = e.clientX;
    posY = e.clientY;

    imageHeight = img.height;
    imageWidth = img.width;

    // originalX = e.target.offsetLeft;
    // originalY = e.target.offsetTop;
  };

  const dragHandler = e => {
    e.target.style.left = `${e.target.offsetLeft + e.clientX - posX}px`;
    e.target.style.top = `${e.target.offsetTop + e.clientY - posY}px`;
    posX = e.clientX;
    posY = e.clientY;
  };

  const dragEndHandler = e => {
    const box = store.getState().box;
    if (
      box.top < e.clientY - imageHeight / 2 &&
      box.bottom > e.clientY + imageHeight / 2 &&
      box.left < e.clientX - imageWidth / 2 &&
      box.right > e.clientX + imageWidth / 2
    ) {
      const data = {
        top: e.clientY - box.top,
        left: e.clientX - box.left,
        width: imageWidth,
        height: imageHeight,
        details: e.target.id,
        imageurl: e.target.src,
      };
      // addItem(data);
      store.dispatch({
        type: "ADD_ITEM",
        data: data,
      });
    }
    // console.log(e);
    // console.log(items);
  };

  return (
    <StyledWrapper>
      <div
        role="tabpanel"
        hidden={!isActive}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {isActive && (
          <Box sx={{ p: 3 }}>
            {getItems(index).map(item => (
              <img
                className="item-list"
                key={item.name}
                id={item.name}
                draggable="true"
                onDragStart={dragStartHandler}
                onDrag={dragHandler}
                onDragEnd={dragEndHandler}
                src={item.imageurl}
              ></img>
            ))}
          </Box>
        )}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .item-list {
    width: 50px;
  }
`;
