import html2canvas from "html2canvas";
import { useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

export default function SaveTableImage() {
  const myTable = useRef(null);
  const myMenu = useSelector(state => state.tableList);

  const getTableImage = () => {
    return (
      <div
        style={{
          width: "940px",
          height: "400px",
          position: "relative",
          background: "#b97a56",
        }}
      >
        {menuRender}
      </div>
    );
  };

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
    const timestamp = Date.now();
    console.log("onCapture");
    html2canvas(myTable.current).then(canvas => {
      console.log(canvas.toDataURL("image/png"));
      console.log(timestamp);
      onSaveAs(canvas.toDataURL("image/png"), `${timestamp}.png`);
    });

    const onSaveAs = (url, filename) => {
      console.log(url);
      var link = document.createElement("a");
      document.body.appendChild(link);
      link.href = url;
      link.download = filename;
      link.click();
      document.body.removeChild(link);
    };
  };
  return (
    <StyledWrapper>
      <div id="table-image" ref={myTable}>
        {menuRender}
      </div>
      <button onClick={onCapture}>앨범 저장</button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
   {
    width: 100px;
    height: 30px;
  }
  #table-image {
    top: -100000px;
    left: -100000px;
    width: 940px;
    height: 400px;
    position: relative;
    background: #b97a56;
  }
`;
