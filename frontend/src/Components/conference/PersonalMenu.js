import * as React from 'react';
import styled from "@emotion/styled";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import menu_rounded from "assets/img/menu_rounded.png";

export default function PersonalMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledWrapper>
      <img src={ menu_rounded } width="20px" height="20px" id="option" alt="메뉴"
      onClick={handleClick} 
      aria-controls={open ? 'basic-menu' : undefined} />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
      <MenuItem onClick={handleClose}>프로필 보기</MenuItem>
      <MenuItem onClick={handleClose}>귓속말 하기</MenuItem>
      <MenuItem onClick={handleClose}>친구 요청</MenuItem>
      <MenuItem onClick={handleClose}>음소거 하기</MenuItem>
      <MenuItem onClick={handleClose}>비디오 끄기</MenuItem>
      {/* 방장일 경우 아래 내용 추가 */}
      {/* <MenuItem onClick={handleClose}>방장 넘기기</MenuItem>
      <MenuItem onClick={handleClose}>강제 추방</MenuItem> */}
    </Menu>
  </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  #option {
    cursor: pointer;
  }
`;