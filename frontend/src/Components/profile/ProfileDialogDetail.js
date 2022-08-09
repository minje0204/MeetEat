import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import closebutton from "assets/img/closebutton.png";

export default function ProfileDialogDetail(props) {
  const { open, onClose } = props;
  
  const handleClose = () => {
    onClose();
  };

  return (
    
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <button onClick={handleClose}>창닫기</button>
      <img src={ closebutton } id="exit-icon" alt="창닫기" onClick={handleClose}/>
    </Dialog>
  );
};
