import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import getItems from "utils/items";
import store from "app/store";
import styled from "styled-components";

export default function ItemTabPanel(props) {
  const { index, isActive, ...other } = props;

  let posX = 0;
  let posY = 0;

  let originalX = 0;
  let originalY = 0;

  const dragStartHandler = e => {
    const img = new Image();
    img.src = e.target.src;
    // img.alt = "image";
    // img.key = e.target.key;
    e.dataTransfer.setDragImage(img, img.style.width / 2, img.style.height / 2);
    posX = e.clientX;
    posY = e.clientY;

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
    const data = {
      top: e.target.offsetTop + e.clientY - posY,
      left: e.target.offsetLeft + e.clientX - posX,
      details: e.target.id,
    };
    store.dispatch({
      type: "add",
      data: data,
    });
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
