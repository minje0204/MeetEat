import Draggable from "react-draggable";
import styled from "@emotion/styled";
import React, { useState } from "react";


export default function TableShape () {
  const state = {
    disabled: false
  };

  const [Opacity, setOpacity] = useState(false);

  const handleStart = () => {
    setOpacity(true);
  };
  const handleEnd = () => {
    setOpacity(false);
  };
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const trackPos = (data) => {
	setPosition({ x: data.x, y: data.y }); 
  };

  return (
    <div>
      <StyledWrapper>
        <Draggable onDrag={(e, data) => trackPos(data)} >
          <div id="box" style={{ opacity: Opacity ? "0.6" : "1" }}>
            <div>{"원하는 곳에 놓아주세요!"}</div>
            <div>x: {position.x.toFixed(0)}, y: {position.y.toFixed(0)}</div>
          </div>
        </Draggable>
      </StyledWrapper>
    </div>
  )
}

const StyledWrapper = styled.div`
  #box {
    position: absolute;
    cursor: move;
    color: black;
    width: 100px;
    border-radius: 5px;
    padding: 1em;
    margin: auto;
    user-select: none;
    background: lightgrey;
  }
`;