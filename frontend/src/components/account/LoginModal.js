import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import ModalContent from "./ModalConetent";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function LoginModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <StyledWrapper>
      <Button onClick={handleOpen}>로그인</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ModalContent handleClose={handleClose}></ModalContent>
        </Box>
      </Modal>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  a {
    text-decoration: none;
  }

  button {
    font-family: "BlackHanSans";
    font-size: 1rem;
    color: black;
    padding: 0em 0.5em;
    border: 1px 1px 1px 1px;
    border-color: #e2dcc8;
    margin: 0px 4px;
    background-color: #fcf8e8;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
    transition: top 0.01s linear;
  }

  button:hover {
    background-color: #fff9ca;
    border: 11px;
    border-color: #ffffff;
  }

  #login-signup {
    font-family: "Mugunghwa";
    font-size: 30px;
    font-weight: bold;
  }
`;
