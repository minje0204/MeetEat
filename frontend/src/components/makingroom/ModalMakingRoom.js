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

export default function ModalMakingRoom(props) {

  const { tableNum, restaurantId } = props;
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [titleValue, setTitleValue] = useState("");
  const [peopleValue, setPeopleValue] = useState("");

  return (
    <StyledWrapper>
      <div id="image-box">
        <img src={table_empty} alt="" onClick={handleClickOpen} id="image" />
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
            onChange={e => setPeopleValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ fontFamily: "Jua", fontSize: 16, color: "inherit" }}>닫기</Button>
          <Button>
            <StyledWrapper2>
              <Link
                to={`/restaurant/${restaurantId}/conference/${tableNum}`}
                state={{ title: titleValue, people: peopleValue, userName }}
                id="link" 
              >만들기
              </Link>
            </StyledWrapper2>
          </Button>
        </DialogActions>
      </Dialog>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  #image-box {
    width: 24vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #image {
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
  #image:hover {
    -webkit-filter: brightness(120%);
  }
`;

const StyledWrapper2 = styled.div`
  #link {
    text-decoration: none;
    color: black;
    font-family: "Jua";
    font-size: 17px;
  }
`;