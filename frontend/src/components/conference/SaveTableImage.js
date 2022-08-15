import html2canvas from "html2canvas";
import { useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Button } from "@mui/material";
import Axios from "utils/axios/Axios";

export default function SaveTableImage() {
  const myTable = useRef(null);
  const myMenu = useSelector(state => state.table.present.tableList);

  const menuRender = myMenu.map((menu, index) => (
    <div
      className="on-table"
      key={`tableitem-${index}`}
      index={index}
      style={{
        position: "absolute",
        width: menu.width,
        height: menu.height,
        top: menu.top - menu.height / 2, //아이템 중앙 기준
        left: menu.left - menu.width / 2, //아이템 중앙 기준
        backgroundImage: `url(${menu.imageurl})`,
        margin: 0,
      }}
    ></div>
  ));

  const onCapture = () => {
    html2canvas(myTable.current).then(canvas => {
      const url = canvas.toDataURL("image/png");
      Axios.post("/table", { data: url })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    });
  };
  return (
    <StyledWrapper>
      <div id="table-image" ref={myTable}>
        {menuRender}
      </div>
      <Button onClick={onCapture}>앨범 저장</Button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  #table-image {
    top: -100000px;
    left: -100000px;
    width: 940px;
    height: 400px;
    position: absolute;
    background: #b97a56;
  }
  button {
    font-family: "Jua";
    font-size: 24px;
    color: black;
    padding: 0em 0.5em;
    border-width: 1px;
    border-color: #babd42;
    margin: 0px 4px;
    background-color: #babd42;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
    transition: top 0.01s linear;
  }
  button:hover {
    background-color: #82954b;
  }
`;
