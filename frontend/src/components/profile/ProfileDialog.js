import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import backbutton from "assets/img/backbutton.png";
import closebutton from "assets/img/closebutton.png";
import hotdog from "assets/img/hotdog.png";
import testinput from "components/profile/testinput";
import ProfileDialogDetail from "components/profile/ProfileDialogDetail";

export default function ProfileDialog() {
  const [open, setOpen] = React.useState(false);
  const [openDetail, setOpenDetail] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clickDetail = () => {
    setOpenDetail(true);
  };
  const detailClose = () => {
    setOpenDetail(false);
  };

  const tablealbumlist = testinput.slice(0).reverse().map((e) => (
    <div key={`table${e.id}`}>
      <div id="example-table" onClick={clickDetail}>
        <ProfileDialogDetail open={openDetail} onClose={detailClose}/>
      </div>
      { e.id }번째 식탁 - { e.date }
    </div>
  ));
  
  return (
    <>
      <div onClick={handleClickOpen}>
        프로필 보기
      </div>
    <Dialog
      maxWidth="lg"
      open={open}
      onClose={handleClose}
      >
      <StyledWrapper>
        <div id="return-exit">
          <Link to={"/"}>
            <Button id="btn" variant="outlined" onClick={handleClose} sx={{ fontFamily: "Jua", fontSize: 16, color: "black", ml: 3, backgroundColor: "#BABD42", borderColor: "#82954B" }}>
              <img src={ backbutton } id="return-icon" alt="수정하기" />회원정보 수정하기
            </Button>
          </Link>
          <img src={ closebutton } id="exit-icon" alt="창닫기" onClick={handleClose}/>
        </div>
        <div id="myiconbox">
          <div id="myicon-layout">
            <img src={ hotdog } id="myicon" alt="아이콘" />
          </div>
        </div>
        <Box id="nickname-hello" component="form">
          <div>
            별명 : Nickname
          </div>
          <div>
            소개 : 밥 먹자!!  
          </div>
        </Box>
        <hr id="horizon-line"/>
        <div id="album">
          <div id="table-album">
            {tablealbumlist}
          </div>
        </div>
      </StyledWrapper>
    </Dialog>
    </>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  align-items: center;

  a{
    text-decoration: none;
  }
  #return-exit {
    width: 100%;
    height: 10px;
    margin: 40px 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  #btn:hover {
    background-color: #82954B;
  }
  #return-icon {
    width: 30px;
    height: 30px;
    margin-right: 5px;
  }
  #exit-icon {
    cursor: pointer;
    width: 40px;
    margin-left: 20px;
    display: flex;
    align-items: center;
  }
	#myiconbox {
    width: 100%;
    height: 15vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2vh 0;
  }
  #myicon-layout {
    height: 100px;
    width: 100px;
    border: 2px solid black;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
	#myicon {
    width: 90%;
    height: 90%;
    object-fit: cover;
  }
  #nickname-hello {
    height: 10vh;
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    font-family: "Jua";
    font-size: 20px;
    flex-direction: column;
  }
  #nickname {
    width: 100%;
    justify-content: center;
    align-items: center;
    margin: 0 1vh;
  }
  #introduce {
    width: 100%;
    justify-content: center;
    align-items: center;
    margin: 0 1vh;
  }
  #horizon-line {
    margin: 30px 0 20px;
    width: 1100px;
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
  }
  #album {
    width: 100%;
    height: 43vh;
    display: flex;
    justify-content: center;
  }
  #table-album {
    width: 1100px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    font-family: "Jua";
    font-size: 17px;
  }
  #example-table {
    background-color: rgb(185, 122, 86);
    width: 305.5px;
    height: 130px;
    margin: 2vh 0;
  }
`;