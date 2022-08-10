import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import table_empty from "assets/img/table_empty.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import roomtitle from "assets/img/roomtitle.png";

export default function ModalMakingRoom(props) {
  const { tableNum, restaurantId } = props;
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  /* eslint-disable-next-line */
  const [peopleValue, setPeopleValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [peopleLimitValue, setPeopleLimitValue] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const makeRoom = () => {};

  /* eslint-disable-next-line */
  const tableList = [
    { id: "1", peopleValue: "", peopleLimitValue: "", titleValue: "" },
    { id: "2", peopleValue: "", peopleLimitValue: "", titleValue: "" },
    { id: "3", peopleValue: "", peopleLimitValue: "", titleValue: "" },
    { id: "4", peopleValue: "", peopleLimitValue: "", titleValue: "" },
    { id: "5", peopleValue: "", peopleLimitValue: "", titleValue: "" },
    { id: "6", peopleValue: "", peopleLimitValue: "", titleValue: "" },
    { id: "7", peopleValue: "", peopleLimitValue: "", titleValue: "" },
    { id: "8", peopleValue: "", peopleLimitValue: "", titleValue: "" },
  ];

  return (
    <StyledWrapper>
      <div id="image-box">
        <div id="roomtitle-box" onClick={handleClickOpen}>
          <img src={roomtitle} alt="방제목" id="roomtitle-img"/>
          <div id="roomtitle-text">
            <div id="roomtitle-text-number-people">
              <div id="roomtitle-text-number">{ tableNum }번방</div>
              <div id="roomtitle-text-people">(2명/6명)</div>
            </div>
            {/* 16글자까지 */}
            <div id="roomtitle-text-title">"오늘 밥 같이 먹을 사람 있나요?"</div>
          </div>
        </div>
        <img src={table_empty} alt="테이블" onClick={handleClickOpen} id="table" />
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontFamily: "Jua", fontSize: 22 }}>{tableNum}번 테이블 만들기</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontFamily: "Jua", fontSize: 18 }}>
            {tableNum}번 테이블에 합석할 사람들을 위해, 테이블 제목과 인원을
            설정해주세요.
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
          <Button onClick={handleClose} sx={{ fontFamily: "Jua", fontSize: 16, color: "inherit" }}>닫기</Button>
          <Button onClick={makeRoom}>
            <StyledWrapperLink>
              <Link
                to={`/restaurant/${restaurantId}/conference/${tableNum}`}
                state={{ title: titleValue, peopleLimit: peopleLimitValue, userName }}
                id="link"
              >만들기
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
  #roomtitle-text-number-people{
    height: 30%;
    display: flex;
    justify-content: space-between;
  }
  #roomtitle-text-title{
    width: 100%;
    height: 70%;
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