import store from "app/store";
import styled from "styled-components";
import getItems from "utils/items";

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
    posX = e.clientX;
    posY = e.clientY;

    imageHeight = img.height;
    imageWidth = img.width;
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

      store.dispatch({
        type: "ADD_ITEM",
        data: data,
      });
    }
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
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  Box {
    display: flex;
  }
  .item-list {
    float: left;
    display: flex;
    width: 72px;
    height: 72px;
    margin-top: 15px;
    justify-content: center;
  }
`;
