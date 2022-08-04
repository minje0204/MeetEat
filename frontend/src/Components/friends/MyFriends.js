import * as React from 'react';
import styled from "styled-components";
import Button from '@mui/material/Button';
import testinput from 'components/friends/testinput';
import option from 'assets/img/option.png';

const friendslist = testinput.map((e, idx) => (
  <div id="friend-each">
    <div id="icon-nickname">
      <div id="imgbox">
        <img
          src={e.avatar}
          id="image"
          alt={`avatar-img-${idx}`}
        ></img>
      </div>
      <div id="nickname">
        {e.nickname}
      </div>
    </div>
    <div id="profile-menu">
      <Button variant="outlined" id="profile">프로필 보기</Button>
      <img src={option} width="20px" height="20px" id="option" alt="메뉴" ></img>
    </div>
  </div>
));

export default function MyFriends() {
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
  }
`;