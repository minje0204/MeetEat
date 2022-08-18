import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  CONFERENCEPAGE_TABLE_WIDTH,
  CONFERENCEPAGE_TABLE_HEIGHT,
  TABLE_AREA_TABLE_WIDTH,
  TABLE_AREA_TABLE_HEIGHT,
} from "utils/conference/constants";

export default function PersonalTable(props) {
  const { myMenu: myMenyProps, isMine } = props;
  const myMenu = useSelector(state => {
    return state.table.present.tableList;
  });
  const menuBuffer = [];
  const [menuList, setMenuList] = useState(isMine ? myMenu : menuBuffer);

  useEffect(() => {
    if (!isMine && myMenyProps) setMenuList(myMenyProps);
  }, [myMenyProps]);

  useEffect(() => {
    if (isMine) setMenuList(myMenu);
  }, [myMenu]);

  const menuRender =
    menuList &&
    menuList.map((menu, index) => {
      return (
        <img
          className="on-table"
          alt="table_item"
          key={`tableitem-${index}`}
          index={index}
          src={menu.imageurl}
          draggable={"false"}
          style={{
            position: "absolute",
            width:
              (menu.width * CONFERENCEPAGE_TABLE_WIDTH) /
              TABLE_AREA_TABLE_WIDTH, //회의페이지 식탁
            height:
              (menu.height * CONFERENCEPAGE_TABLE_HEIGHT) /
              TABLE_AREA_TABLE_HEIGHT,
            left:
              ((menu.left - menu.width / 2) * CONFERENCEPAGE_TABLE_WIDTH) /
              TABLE_AREA_TABLE_WIDTH, //아이템 중앙 기준
            top:
              ((menu.top - menu.height / 2) * CONFERENCEPAGE_TABLE_HEIGHT) /
              TABLE_AREA_TABLE_HEIGHT, //아이템 중앙 기준
            margin: 0,
          }}
        ></img>
      );
    });
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
