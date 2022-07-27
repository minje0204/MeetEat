import { useState } from "react";
import TableItems from "./TableItems";
import styled from "styled-components";
import TableShape from "./TableShape";

export default function ItemTab () {
  const [activeIndex, setActiveIndex]=useState(0);
  
  const tabClickHandler = (index) =>{
    setActiveIndex(index);
  };

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

  return (
    <StyledWrapper>
      <h2>식탁 꾸미기</h2>
      <div className="tabs is-boxed">
        {tabContArr.map((section, index)=>{
            return section.tabTitle
        })}
      </div>
      <TableItems tabSelect={activeIndex}></TableItems>
      <TableShape></TableShape>
    </StyledWrapper>
  )
};

const StyledWrapper = styled.div`
.is-active {
  font-weight: bold;
  text-decoration: underline;
}
`