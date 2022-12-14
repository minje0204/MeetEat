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
import { useState, useEffect } from "react";
import roomtitle from "assets/img/roomtitle.png";
import Axios from "utils/axios/Axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function ModalMakingRoom(props) {
  const navigate = useNavigate();
  const { restaurantId, tableInfo } = props;
  const [open, setOpen] = useState(false);
  /* eslint-disable-next-line */
  const [userName, setUserName] = useState("");
  const [conferenceId, setConferenceId] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [peopleLimitValue, setPeopleLimitValue] = useState(2);
  const [highlightValue, setHighlightValue] = useState(2);

  const joinRoom = () => {
    Axios.get(`/restaurant/conference/${encodeURI(conferenceId)}`)
      .then(response => {
        if (response.data.status === 200) {
          window.sessionStorage.setItem("conferencePermission", true);
          navigate(`/restaurant/conference/${conferenceId}`, {
            state: {
              title: tableInfo.title,
              peopleLimit: tableInfo.maxUserNum,
              userName: sessionStorage.getItem("nickname"),
              conferenceId,
              restaurantId,
              position: tableInfo.position,
            },
          });
        }
      })
      .catch(err => rejectMessage());
  };

  const rejectMessage = () => {
    toast.error("???????????? ????????? ????????? ???????????????.", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const makeRoom = () => {
    if (!titleValue) {
      toast.error("????????? ????????? ?????????", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }
    if (peopleLimitValue < 2 || peopleLimitValue > 6) {
      toast.error("?????? ????????? ????????? ?????????", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }
    Axios.post(`/restaurant/${encodeURI(restaurantId)}`, {
      title: titleValue,
      maxUserNum: peopleLimitValue,
      position: tableInfo.position,
      restaurantId: restaurantId,
    })
      .then(response => {
        if (response.data.status === 200) {
          setConferenceId(response.data.response.id);
          window.sessionStorage.setItem("conferencePermission", true);
          navigate(`/restaurant/conference/${response.data.response.id}`, {
            state: {
              title: titleValue,
              peopleLimit: peopleLimitValue,
              userName: sessionStorage.getItem("nickname"),
              conferenceId: response.data.response.id,
              restaurantId,
              position: tableInfo.position,
            },
          });
        }
      })
      .catch(err => rejectMessage());
  };

  useEffect(() => {
    setConferenceId(tableInfo.id);
  }, [tableInfo.id]);

  return (
    <StyledWrapper>
      {!tableInfo.currentUserNum ? (
        <div id="image-box">
          <div id="roomtitle-box" onClick={handleClickOpen}>
            <img src={roomtitle} alt="?????????" id="roomtitle-img" />
            <div id="roomtitle-text">
              <div id="roomtitle-text-default">??? ?????????</div>
            </div>
          </div>
          <img
            src={table_empty}
            alt="?????????"
            onClick={handleClickOpen}
            id="table"
          />
        </div>
      ) : (
        <div id="image-box" onClick={joinRoom}>
          <div id="roomtitle-box">
            <img src={roomtitle} alt="?????????" id="roomtitle-img" />
            <div id="roomtitle-text">
              <div id="roomtitle-text-number-people">
                <div id="roomtitle-text-number">
                  {tableInfo.position}??? ?????????
                </div>
                <div id="roomtitle-text-people">
                  ({tableInfo.currentUserNum}/{tableInfo.maxUserNum})
                </div>
              </div>
              {/* 16???????????? */}
              <div id="roomtitle-text-title">{tableInfo.title}</div>
            </div>
          </div>
          {tableInfo.currentUserNum === tableInfo.maxUserNum ? (
            <img src={table_full} alt="?????????" id="table" />
          ) : (
            <img src={table_alone} alt="?????????" id="table" />
          )}
        </div>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontFamily: "Jua", fontSize: 22 }}>
          {tableInfo.position}??? ????????? ?????????
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontFamily: "Jua", fontSize: 18 }}>
            {tableInfo.position}??? ???????????? ????????? ???????????? ??????, ????????? ?????????
            ????????? ??????????????????.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="????????? ??????"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => setTitleValue(e.target.value)}
          />
          {/* <TextField
            id="standard-number"
            label="?????? ??? ( 2 ~ 6??? )"
            margin="dense"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            onChange={e => setPeopleLimitValue(e.target.value)}
          /> */}
          <div id="max-people">
            <DialogContentText sx={{ fontFamily: "Jua", fontSize: 13, mt: 2 }}>
              ?????? ??????
            </DialogContentText>
            <ToggleButtonGroup
              value={highlightValue}
              exclusive
              onChange={(e, highlight) => {
                setPeopleLimitValue(highlight);
                setHighlightValue(highlight);
              }}
              aria-label="text alignment"
              fullWidth={true}
              color="primary"
            >
              <ToggleButton value={2} aria-label="2???">
                2???
              </ToggleButton>
              <ToggleButton value={3} aria-label="3???">
                3???
              </ToggleButton>
              <ToggleButton value={4} aria-label="4???">
                4???
              </ToggleButton>
              <ToggleButton value={5} aria-label="5???">
                5???
              </ToggleButton>
              <ToggleButton value={6} aria-label="6???">
                6???
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{ fontFamily: "Jua", fontSize: 16, color: "inherit" }}
          >
            ??????
          </Button>
          <Button
            onClick={makeRoom}
            sx={{ fontFamily: "Jua", fontSize: 16, color: "inherit" }}
          >
            ?????????
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
  #max-people {
    display: flex;
  }
`;