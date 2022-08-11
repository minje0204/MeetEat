import * as React from 'react';
import styled from "styled-components";
import Button from '@mui/material/Button';
import testinput from 'components/friends/testinput';
import option from 'assets/img/option.png';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function FriendslistOption(props) {
  const { open, onClose, anchorEl } = props;
  const handleClose = () => {
    onClose();
  }
  return(
    <Menu
      id="basic-menu"
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
      PaperProps={{ style: { boxShadow: 'none', border: '3px solid #EFD345', borderRadius: '10px', backgroundColor: '#FFEF82' } }}
    >
      <MenuItem onClick={handleClose} sx={{ color: "black", fontFamily: "Jua" }}>친구 위치보기</MenuItem>
      <MenuItem onClick={handleClose} sx={{ color: "#FF0063", fontFamily: "Jua" }}>친구 삭제하기</MenuItem>
    </Menu>
  );
};


export default function MyFriends() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openOption = Boolean(anchorEl);
  const clickOption = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeOption = () => {
    setAnchorEl(null);
  };

  const friendslist = testinput.map((e, idx) => (
    <div id="friend-each" key={`${idx}`}>
      <div id="icon-nickname">
        <div id="imgbox">
          <img src={e.avatar} id="image" alt={`avatar-img-${idx}`} />
        </div>
        <div id="nickname">
          {e.nickname}
        </div>
      </div>
      <div id="profile-menu">
        <Button variant="outlined" id="profile">프로필 보기</Button>
        <img src={option} onClick={clickOption} width="20px" height="20px" id="option" alt="메뉴" />
        <FriendslistOption open={openOption} anchorEl={anchorEl} onClose={closeOption} />
      </div>
    </div>
  ));

  return (
    <StyledWrapper>
      <div id="friend-whole">
        { friendslist }
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  #friend-whole{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #friend-each {
    height: 70px;
    width: 90%;
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    border: 4px solid #EFD345;
    border-radius: 20px;
  }
  #icon-nickname {
    font-family: "Jua";
    font-size: 26px;
    display: flex;
    align-items: center;
  }
  #imgbox {
    height: 50px;
    width: 50px;
    margin: 0 10px;
    border: 2px solid black;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  #image {
    width: 90%;
    height: 90%;
    object-fit: cover;
  }
  #profile-menu {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    align-items: center;
  }
  #profile {
    margin-left: 10px;
    padding: 2px 5px;
    border-color: black;
    font-family: "Jua";
    font-size: 16px;
    color: black;
    background-color: #EFD345;
  }
  #option {
    margin: 0 10px;
    cursor: pointer;
  }
`;