import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import table_empty from "assets/img/table_empty.svg";
import table_alone from "assets/img/table_alone.svg";
import table_full from "assets/img/table_full.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import roomtitle from "assets/img/roomtitle.png";
import Axios from "utils/axios/Axios";
import { useSelector } from "react-redux";

export default function ModalMakingRoom(props) {
  const { restaurantId, tableInfo } = props;
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  /* eslint-disable-next-line */
  const [peopleValue, setPeopleValue] = useState("");
  // const [joinRequest, setJoinRequest] = useState(0);
  let joinRequest = 0;
  const [titleValue, setTitleValue] = useState("");
  const [peopleLimitValue, setPeopleLimitValue] = useState("");
  const user_nickname = useSelector(state => state.user.loggedInfo.nickname);

  const joinRoom = event => {
    Axios.get(`/restaurant/${restaurantId}/conference/${tableInfo.id}`)
      // .then(response => {
      //   // setJoinRequest(response.data.status);
      //   joinRequest = response.data.status;
      // })
      // .then(() => {
      //   if (joinRequest !== 200) event.preventDefault();
      // })
      // .catch(error => {
      //   event.preventDefault();
      // });
      .then(resposne => {
        if (resposne.data.status == 200) var link = document.createElement("a");
        document.body.appendChild(link);
        link.href = `/restaurant/${restaurantId}/conference/${tableInfo.id}`;
        link.click();
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const makeRoom = () => {};

  return (
    <StyledWrapper>
      {!tableInfo.currentUserNum ? (
        <div id="image-box">
          <div id="roomtitle-box" onClick={handleClickOpen}>
            <img src={roomtitle} alt="방제목" id="roomtitle-img" />
            <div id="roomtitle-text">
              <div id="roomtitle-text-default">빈 테이블</div>
            </div>
          </div>
          <img
            src={table_empty}
            alt="테이블"
            onClick={handleClickOpen}
            id="table"
          />
        </div>
      ) : (
        // <StyledWrapperLink>
        //   <Link
        //     to={`/restaurant/${restaurantId}/conference/${tableInfo.id}`}
        //     state={{
        //       title: tableInfo.title,
        //       peopleLimit: tableInfo.maxUserNum,
        //       userName: user_nickname,
        //     }}
        //     id="link"
        //     onClick={joinRoom}
        //   >
        <div id="image-box" onClick={joinRoom}>
          <div id="roomtitle-box">
            <img src={roomtitle} alt="방제목" id="roomtitle-img" />
            <div id="roomtitle-text">
              <div id="roomtitle-text-number-people">
                <div id="roomtitle-text-number">
                  {tableInfo.position}번 테이블
                </div>
                <div id="roomtitle-text-people">
                  ({tableInfo.currentUserNum}/{tableInfo.maxUserNum})
                </div>
              </div>
              {/* 16글자까지 */}
              <div id="roomtitle-text-title">{tableInfo.title}</div>
            </div>
          </div>
          {tableInfo.currentUserNum === tableInfo.maxUserNum ? (
            <img src={table_full} alt="테이블" id="table" />
          ) : (
            <img src={table_alone} alt="테이블" id="table" />
          )}
        </div>
        //   </Link>
        // </StyledWrapperLink>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontFamily: "Jua", fontSize: 22 }}>
          {tableInfo.position}번 테이블 만들기
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontFamily: "Jua", fontSize: 18 }}>
            {tableInfo.position}번 테이블에 합석할 사람들을 위해, 테이블 제목과
            인원을 설정해주세요.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="테이블 제목"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => setTitleValue(e.target.value)}
          />
          <TextField
            margin="dense"
            id="user-name"
            label="이름"
            type="text"
            variant="standard"
            onChange={e => setUserName(e.target.value)}
          />
          <TextField
            id="standard-number"
            label="인원 수 ( 2 ~ 6명 )"
            margin="dense"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            style={{ marginLeft: "50px" }}
            variant="standard"
            onChange={e => setPeopleLimitValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{ fontFamily: "Jua", fontSize: 16, color: "inherit" }}
          >
            닫기
          </Button>
          <Button onClick={makeRoom}>
            <StyledWrapperLink>
              <Link
                to={`/restaurant/${restaurantId}/conference/${tableInfo.position}`}
                state={{
                  title: titleValue,
                  peopleLimit: peopleLimitValue,
                  userName,
                }}
                id="link"
              >
                만들기
              </Link>
            </StyledWrapperLink>
          </Button>
        </DialogActions>
      </Dialog>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  #image-box {
    width: 22vw;
    height: 40vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  #roomtitle-box {
    cursor: pointer;
    max-width: 60%;
    max-height: 40%;
    display: flex;
    position: relative;
  }
  #roomtitle-img {
    width: 100%;
    vertical-align: middle;
  }
  #roomtitle-text {
    padding: 5px 10px;
    position: absolute;
    width: 80%;
    top: 28%;
    left: 5%;
    font-family: "Jua";
  }
  #roomtitle-text-number-people {
    height: 30%;
    display: flex;
    justify-content: space-between;
  }
  #roomtitle-text-title {
    width: 100%;
    height: 70%;
  }
  #roomtitle-text-default {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 100%);
  }
  #table {
    cursor: pointer;
    max-width: 90%;
    max-height: 90%;
    -webkit-filter: brightness(70%);
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }
  #table:hover {
    -webkit-filter: brightness(120%);
  }
`;

const StyledWrapperLink = styled.div`
  #link {
    text-decoration: none;
    color: black;
    font-family: "Jua";
    font-size: 16px;
    height: 28px;
  }
`;
