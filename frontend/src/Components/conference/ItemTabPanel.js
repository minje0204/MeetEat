import store from "app/store";
import styled from "styled-components";
import getItems from "utils/items";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider, DragPreviewImage, useDrag } from "react-dnd";

export default function ItemTabPanel(props) {
  const { index, isActive, ...other } = props;
  let posX = 0;
  let posY = 0;

  let imageWidth = 0;
  let imageHeight = 0;

  const dragStartHandler = e => {
    const img = new Image();
    img.src = e.target.src;
    e.dataTransfer.setDragImage(img, img.width * 0.5, img.height * 0.5);
    console.log(e);
    posX = e.clientX;
    posY = e.clientY;
    imageHeight = e.target.naturalHeight;
    imageWidth = e.target.naturalWidth;
  };

  const dragHandler = e => {
    e.target.style.left = `${e.target.offsetLeft + e.clientX - posX}px`;
    e.target.style.top = `${e.target.offsetTop + e.clientY - posY}px`;
    posX = e.clientX;
    posY = e.clientY;
  };

  const dragEndHandler = e => {
    console.log(e);
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

      store.dispatch({
        type: "ADD_ITEM",
        data: data,
      });
    }
  };

  return (
    <StyledWrapper>
      <DndProvider backend={HTML5Backend}>
        <div
          role="tabpanel"
          hidden={!isActive}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
        >
          {isActive && (
            <div>
              {getItems(index).map(item => (
                <div className="item-list" key={item.name}>
                  <img
                    id={item.name}
                    draggable="true"
                    onDragStart={dragStartHandler}
                    onDrag={dragHandler}
                    onDragEnd={dragEndHandler}
                    src={item.imageurl}
                    alt={item.name}
                  ></img>
                </div>
              ))}
            </div>
          )}
        </div>
      </DndProvider>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  Box {
    display: flex;
  }
  img {
    object-fit: scale-down;
    max-width: 100%;
    max-height: 100%;
  }
  .item-list {
    float: left;
    display: flex;
    width: 60px;
    height: 72px;
    margin-left: 6px;
    margin-right: 6px;
    margin-top: 15px;
    justify-content: center;
  }
`;
