import * as React from 'react';
import styled from "styled-components";
import Button from '@mui/material/Button';
import option from 'assets/img/option.png';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Axios from "utils/axios/Axios";
import FriendsProfileDialog from 'components/profile/FriendsProfileDialog';

function FriendsListOption(props) {
  const { open, onClose, anchorEl, idx } = props;
  const handleClose = () => {
    onClose();
  };
  const HandleDelete = () => {
    React.useEffect(() => {
      Axios.delete(`/friend/${idx}`);
    });
    onClose();
  };
  
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
      <MenuItem onClick={HandleDelete} sx={{ color: "#FF0063", fontFamily: "Jua" }}>친구 삭제하기</MenuItem>
    </Menu>
  );
};

export default function MyFriends() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [friendsWithMe, setFriendsWithMe] = React.useState([]);
  const openOption = Boolean(anchorEl);
  const clickOption = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeOption = () => {
    setAnchorEl(null);
  };

  function truefriends(data) {
    const dataList = [];
    for (let i = 0; i < data.length; i++) {
      let user = data[i];
      if (user.status === 1) {
        dataList.push(user);
      };
    };
    setFriendsWithMe(dataList);
  };

  React.useEffect(() => {
    Axios.get(`/friend`).then(res => {
      truefriends(res.data.response);
    });
  }, []);

  const friendsList = friendsWithMe.map((e, idx) => (
    <div id="friend-each" key={`${idx}`}>
      <div id="icon-nickname">
        <div id="imgbox">
          <img src={e.friendInfo.profile} id="image" alt={`사진 ${idx}`} />
        </div>
        <div id="nickname">
          {e.friendInfo.nickname}
        </div>
      </div>
      <div id="profile-menu">
        <Button variant="outlined" id="profile">
          <FriendsProfileDialog who={e.friendInfo.id}/>
        </Button>
        <img src={option} onClick={clickOption} width="20px" height="20px" id="option" alt="메뉴" />
        <FriendsListOption open={openOption} anchorEl={anchorEl} onClose={closeOption} idx={e.friendInfo.id} />
      </div>
    </div>
  ));

  return (
    <StyledWrapper>
      <div id="friend-whole">
        { friendsList }
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