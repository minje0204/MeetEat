import styled from "styled-components";
import getItems from "utils/items";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { AddItem } from "modules/table";

export default function ItemTabPanel(props) {
  const { index, isActive, getDroppable, isDragging, ...other } = props;
  let posX = 0;
  let posY = 0;
  const dispatch = useDispatch();

  const dragStartHandler = e => {
    const img = new Image();
    img.id = "drag-image";
    img.src = e.target.src;
    e.dataTransfer.setDragImage(img, img.width * 0.5, img.height * 0.5);
    posX = e.clientX;
    posY = e.clientY;
    props.isDragging(true);
  };

  const box = useSelector(state => state.box.box);
  const dragHandler = e => {
    e.target.style.left = `${e.target.offsetLeft + e.clientX - posX}px`;
    e.target.style.top = `${e.target.offsetTop + e.clientY - posY}px`;
    posX = e.clientX;
    posY = e.clientY;
    if (
      box.top < e.clientY - e.target.naturalHeight / 2 &&
      box.bottom > e.clientY + e.target.naturalHeight / 2 &&
      box.left < e.clientX - e.target.naturalWidth / 2 &&
      box.right > e.clientX + e.target.naturalWidth / 2
    ) {
      getDroppable(true);
    } else {
      getDroppable(false);
    }
  };

  const dragEndHandler = e => {
    const imageHeight = e.target.naturalHeight;
    const imageWidth = e.target.naturalWidth;

    props.isDragging(false);
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
      dispatch(AddItem(data));
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
                    {...other}
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
    cursor: grab;
  }
  img:hover {
    transform: scale(1.3);
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
