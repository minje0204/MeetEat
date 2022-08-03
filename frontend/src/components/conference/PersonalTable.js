import { useSelector } from "react-redux";
import styled from "styled-components";
import store from "app/store";

export default function PersonalTable() {
  const myMenu = useSelector(state => state.tableList);
  const box = useSelector(state => state.box);
  const menuRender = myMenu.map((menu, index) => (
    <img
      className="on-table"
      key={`tableitem-${index}`}
      index={index}
      src={menu.imageurl}
      style={{
        position: "absolute",
        width: (menu.width * 470) / box.width,
        height: (menu.height * 200) / box.height,
        left: ((menu.left - menu.width / 2) * 470) / box.width, //아이템 중앙 기준
        top: ((menu.top - menu.height / 2) * 200) / box.height, //아이템 중앙 기준
        margin: 0,
      }}
    ></img>
  ));
  return (
    <StyledWrapper>
      <div>{menuRender}</div>
    </StyledWrapper>
  );
}
const StyledWrapper = styled.div`
   {
    width: 470px;
    height: 200px;
    object-fit: cover;
    margin: 0;
    background-color: rgb(216, 204, 163);
    position: absolute;
  }
`;
