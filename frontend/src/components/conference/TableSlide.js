import { useRef, useState } from "react";
import Slide from "@mui/material/Slide";
import ItemTab from "./ItemTab";
import TableArea from "./TableArea";
import styled from "styled-components";
import SaveTableImage from "./SaveTableImage";
import { useDispatch } from "react-redux";
import { GetBoundary } from "modules/box";
import UndoTableCustom from "./UndoTableCustom";

export default function TableSlide(props) {
  const { conferenceId } = props;
  const [checked, setChecked] = useState(false);

  const dispatch = useDispatch();
  const [droppable, setDroppable] = useState(false);
  const [dragging, setDragging] = useState(false);

  const getDroppable = value => {
    setDroppable(value);
  };
  const isDragging = value => {
    setDragging(value);
  };

  const table = useRef(null);

  function getBoundaryLocal() {
    if (table.current) {
      const box = table.current.getBoundingClientRect();
      const data = {
        top: box.top,
        left: box.left,
        bottom: box.top + box.height,
        right: box.left + box.width,
        height: box.height,
        width: box.width,
      };
      dispatch(GetBoundary(data));
    }
  }

  window.addEventListener("resize", () => {
    getBoundaryLocal();
  });

  const handleChange = () => {
    setChecked(prev => !prev);
  };
  return (
    <StyledWrapper>
      {!checked && (
        <div className="in-button" onClick={handleChange}>
          <h3>식탁꾸미기</h3>
        </div>
      )}
      <Slide
        direction="left"
        in={checked}
        mountOnEnter
        unmountOnExit
        onEntered={getBoundaryLocal}
      >
        <div className="slide-container">
          <div className="button" onClick={handleChange}>
            <h3>식탁꾸미기 </h3>
          </div>
          <div id="table-custom" className="table-custom">
            <ItemTab
              getDroppable={getDroppable}
              isDragging={isDragging}
            ></ItemTab>
            <div className="table-container">
              <TableArea
                ref={table}
                droppable={droppable}
                dragging={dragging}
                getDroppable={getDroppable}
                isDragging={isDragging}
              ></TableArea>
              <div className="button-group">
                <UndoTableCustom></UndoTableCustom>
                <SaveTableImage conferenceId={conferenceId}></SaveTableImage>
              </div>
            </div>
          </div>
        </div>
      </Slide>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
   {
    max-width: 1000px;
  }
  .button {
    position: relative;
    min-width: 50px;
    width: 50px;
    margin-left: 50px;
    height: 200px;
    background: #efd345;
    display: flex;
    align-items: center;
    border-radius: 10px 0 0 10px;
    z-index: 40;
  }
  .button:hover {
    cursor: pointer;
  }
  h3 {
    font-family: "Jua";
    writing-mode: vertical-rl;
    margin: auto;
  }
  .in-button {
    top: 10%;
    position: absolute;
    right: 0;
    width: 50px;
    float: right;
    height: 200px;
    background: #ffef82;
    vertical-align: middle;
    z-index: 40;
    border-radius: 10px 0 0 10px;
    display: flex;
    align-items: center;
  }
  .in-button:hover {
    cursor: pointer;
  }
  .slide-container {
    max-width: 100%;
    position: absolute;
    top: 10%;
    right: 0;
    display: flex;
    z-index: 140;
  }
  .table-custom {
    display: flex;
    border-radius: 0 0 0 40px;
    position: relative;
    background: #ffef82;
    // border: 5px solid #efd345;
  }
  .table-container {
    margin-right: 30px;
    padding: 30px;
  }
  Slide {
    max-width: 100%;
  }
  .button-group {
    display: flex;
    justify-content: space-evenly;
    padding-top: 30px;
  }
`;
