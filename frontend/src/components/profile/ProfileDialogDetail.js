import { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Axios from "utils/axios/Axios";

export default function ProfileDialogDetail(props) {
  const { open, onClose, id, fetchUserProfile, tableDetail } = props;

  const handleClose = () => {
    onClose();
  };
  const handleDelete = () => {
    Axios.delete(`tray/${id}`)
      .then(res => {
        onClose();
        fetchUserProfile();
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    Axios.get(`tray/${id}`)
      .then(res => {
        console.log(res);
      })
      .catch(e => console.log(e));
  }, []);

  return (
    <Dialog
      id="dialog"
      onClose={handleClose}
      open={open}
      BackdropProps={{ invisible: true }}
      PaperProps={{
        style: {
          boxShadow: "none",
          border: "3px solid #EFD345",
          borderRadius: "10px",
          backgroundColor: "#FFEF82",
        },
      }}
    >
      <StyledWrapper>
        <div id="container">
          <div id="header"></div>
          <div id="body">
            <div id="example-table" />
            <div id="text">
              <div id="room-title">방제목 : {tableDetail?.conferenceTitle}</div>
              <div id="date">날짜 : {tableDetail?.date}</div>
            </div>
            <div id="horizon-line" />
          </div>
          <div id="footer">
            <Button onClick={handleDelete}>삭제하기</Button>
            <Button onClick={handleClose}>창 닫기</Button>
          </div>
        </div>
      </StyledWrapper>
    </Dialog>
  );
}

const StyledWrapper = styled.div`
  #container {
    width: 500px;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #header {
    width: 100%;
    height: 5%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  #exit-icon {
    cursor: pointer;
    width: 40px;
    height: 40px;
    margin-right: 10px;
    display: flex;
    align-items: center;
  }
  #body {
    width: 100%;
    height: 75%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
  #example-table {
    background-color: rgb(185, 122, 86);
    width: 457.75px;
    height: 195px;
  }
  #text {
    width: 90%;
    height: 25%;
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    font-family: "Jua";
    font-size: 24px;
  }
  #date {
    font-size: 20px;
  }
  #horizon-line {
    width: 457.75px;
    border: 0;
    height: 1.5px;
    background-color: #efd345;
  }
  #footer {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  #footer button {
    font-family: "Jua";
    font-size: 24px;
    color: black;
    padding: 0em 0.5em;
    border: 1px line #e2dcc8;
    margin: 0px 4px;
    background-color: #efd345;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
    transition: top 0.01s linear;
  }
`;
