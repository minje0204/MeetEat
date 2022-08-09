import { useSelector } from "react-redux";
import styled from "styled-components";

export default function PersonalTable() {
  const myMenu = useSelector(state => state.tableList);
  const box = useSelector(state => state.box);
  const menuRender = myMenu.map((menu, index) => (
    <img
      className="on-table"
      key={`tableitem-${index}`}
      index={index}
      src={menu.imageurl}
      draggable={"false"}
      style={{
        position: "absolute",
        width: (menu.width * 305.5) / box.width,
        height: (menu.height * 130) / box.height,
        left: ((menu.left - menu.width / 2) * 305.5) / box.width, //아이템 중앙 기준
        top: ((menu.top - menu.height / 2) * 130) / box.height, //아이템 중앙 기준
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
    width: 305.5px;
    height: 130px;
    object-fit: cover;
    margin: auto;
    background: #b97a56;
    position: relative;
  }
`;
