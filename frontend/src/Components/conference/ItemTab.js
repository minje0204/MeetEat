import { useState } from "react";
import TableItems from "./TableItems";
import styled from "styled-components";

export default function ItemTab () {
  
  let posX = 0;
  let posY = 0;

  let originalX = 0;
  let originalY = 0;

  const [activeIndex, setActiveIndex]=useState(0);
  
  const tabClickHandler = (index) =>{
    setActiveIndex(index);
  };
  
  // const dragStartHandler = e => {
  //   posX = e.clientX;
  //   posY = e.clientY;
  //   originalX = e.target.offsetLeft;
  //   originalY = e.target.offsetTop;
  //   console.log('드래그 시작')
  //   console.log(e)
  // }
  // const dragHandler = e => {
  //   e.target.style.left = `${e.target.offsetLeft + e.clientX - posX}px`;
  //   e.target.style.top = `${e.target.offsetTop + e.clientY - posY}px`;
  //   posY = e.clientY;
  //   posX = e.clientX;
  //   console.log(posX, posY)
  // };

  const tabContArr=[
    {
      tabTitle:(
          <span className={activeIndex===0 ? "is-active" : ""} onClick={()=>tabClickHandler(0)}> 식기류 </span>
      ),
    },
    {
      tabTitle:(
          <span className={activeIndex===1 ? "is-active" : ""} onClick={()=>tabClickHandler(1)}> 한식 </span>
      ),
    },
    {
      tabTitle:(
          <span className={activeIndex===2 ? "is-active" : ""} onClick={()=>tabClickHandler(2)}> 일식 </span>
      ),
    },
    {
      tabTitle:(
          <span className={activeIndex===3 ? "is-active" : ""} onClick={()=>tabClickHandler(3)}> 양식 </span>
      ),
    }
  ];

  // const dragItem = document.querySelectorAll('span')
  // console.log(dragItem)
  // dragItem.forEach((e) => {e.addEventListener('dragstart', dragStartHandler)})
  // dragItem.forEach((e) => {e.addEventListener('drag', dragStartHandler)})

  return (
    <StyledWrapper>
      <h2>식탁 꾸미기</h2>
      <div className="tabs is-boxed">
        {tabContArr.map((section, index)=>{
          return section.tabTitle
        })}
      </div>
      <TableItems tabSelect={activeIndex}></TableItems>
    </StyledWrapper>
  )
};

const StyledWrapper = styled.div`
.is-active {
  font-weight: bold;
  text-decoration: underline;
}
`