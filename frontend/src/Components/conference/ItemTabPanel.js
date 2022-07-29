import Box from "@mui/material/Box";
import store from "app/store";
import styled from "styled-components";
import getItems from "utils/items";

export default function ItemTabPanel(props) {
  const { index, isActive, ...other } = props;

  let posX = 0;
  let posY = 0;

  let originalX = 0;
  let originalY = 0;

  let imageWidth = 0;
  let imageHeight = 0;

  const dragStartHandler = e => {
    const img = new Image();
    img.src = e.target.src;
    console.log(img.width, img.height);
    console.log(img);
    e.dataTransfer.setDragImage(img, img.width * 0.6, img.height * 0.6);
    console.log(`e.clientX ${e.clientX}`);
    console.log(`e.clientY ${e.clientY}`);
    console.log(`e.target.offsetLeft ${e.target.offsetLeft}`);
    posX = e.clientX;
    posY = e.clientY;

    imageHeight = img.height;
    imageWidth = img.width;

    originalX = e.target.offsetLeft;
    originalY = e.target.offsetTop;
  };

  const dragHandler = e => {
    e.target.style.left = `${e.target.offsetLeft + e.clientX - posX}px`;
    e.target.style.top = `${e.target.offsetTop + e.clientY - posY}px`;
    posX = e.clientX;
    posY = e.clientY;
  };

  const dragEndHandler = e => {
    const box = store.getState();
    console.log(e);
    if (
      box.box.top < e.clientY &&
      box.box.bottom > e.clientY &&
      box.box.left < e.clientX &&
      box.box.right > e.clientX
    ) {
      const data = {
        top: e.clientY - box.box.top,
        left: e.clientX - box.box.left,
        width: imageWidth,
        height: imageHeight,
        details: e.target.id,
        imageurl: e.target.src,
      };
      store.dispatch({
        type: "add",
        data: data,
      });
    }
    // console.log(e);
    console.log(store.getState().tableList);
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
