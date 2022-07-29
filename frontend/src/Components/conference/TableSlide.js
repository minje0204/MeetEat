import { useRef, useState } from "react";
import Slide from "@mui/material/Slide";
import ItemTab from "./ItemTab";
import TableArea from "./TableArea";
import styled from "styled-components";
import store from "app/store";

export default function TableSlide() {
  const [checked, setChecked] = useState(false);

  const table = useRef(null);

  function getBoundary() {
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
      store.dispatch({
        type: "GET_BOUNDARY",
        data: data,
      });
    }
  }

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
        onEntered={getBoundary}
      >
        <div className="slide-container">
          <div className="button" onClick={handleChange}>
            <h3>식탁꾸미기</h3>
          </div>
          <div className="table-custom">
            <ItemTab></ItemTab>
            <div className="table-container">
              <TableArea ref={table}></TableArea>
            </div>
          </div>
        </div>
      </Slide>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    position: relative;
    width: 50px;
    margin-left: 50px;
    height: 200px;
    background: olive;
    display: flex;
    align-items: center;
  }
  h3 {
    writing-mode: vertical-rl;
    margin: auto;
  }
  .in-button {
    margin-top: 30px;
    position: absolute;
    right: 0;
    width: 50px;
    float: right;
    margin-left: 50px;
    height: 200px;
    background: olive;
    vertical-align: middle;

    display: flex;
    align-items: center;
  }
  .slide-container {
    position: absolute;
    right: 0;
    display: flex;
  }
  .table-custom {
    display: flex;
    position: relative;
    background: #eeeeee;
  }
  .table-container {
    padding: 30px;
  }
`;
