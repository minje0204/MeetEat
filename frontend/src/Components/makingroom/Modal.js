import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from "react-router-dom";
import { useState } from "react";

export default function FormDialog(props) {
const { tableNum, restaurantId } = props;

const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
setOpen(true);
};

const handleClose = () => {
setOpen(false);
};

const [titleValue, setTitleValue] = useState("");
const [peopleValue, setPeopleValue] = useState("");


return (
<div>
    <Button variant="outlined" onClick={handleClickOpen}>
    { tableNum }번 테이블
    </Button>
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>{ tableNum }번 테이블 만들기</DialogTitle>
    <DialogContent>
        <DialogContentText>
        { tableNum }번 테이블에 합석할 사람들을 위해, 테이블 제목과 인원을 설정해주세요.
        </DialogContentText>
        <TextField
        autoFocus
        margin="dense"
        id="name"
        label="테이블 제목"
        type="text"
        fullWidth
        variant="standard"
        onChange={(e) => setTitleValue(e.target.value)}
        />
        <TextField
        id="standard-number"
        label="인원 수 ( 2 ~ 6명 )"
        margin="dense"
        type="number"
        InputLabelProps={{
            shrink: true,
        }}
        variant="standard"
        onChange={(e) => setPeopleValue(e.target.value)}
        />
    </DialogContent>
    <DialogActions>
        <Button onClick={handleClose}>닫기</Button>
        <Link to={`/restaurant/+${restaurantId}/conference/${tableNum}`} state={{ title: titleValue, people: peopleValue }}>
            만들기
        </Link>
    </DialogActions>
    </Dialog>
</div>
);
}
