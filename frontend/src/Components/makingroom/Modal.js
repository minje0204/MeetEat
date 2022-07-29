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
import styled from "@emotion/styled";
import table_empty from "assets/img/table_empty.svg";
import table_alone from "assets/img/table_alone.svg";
import table_full from "assets/img/table_full.svg";
import roomsign from "assets/img/roomsign.png";


export default function Modal(props) {

// 하위 컴포넌트인 ConferencePage의 현재 인원 수 data를 이용하여 테이블의 상태를 표시해야 한다.
// const tableStatus = [
//     { id: "1", image: { table_empty } },
//     { id: "2", image: { table_alone } },
//     { id: "3", image: { table_full } }
//   ];

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

// const validation = () => {
// 	let check = /[~!@#$%^&*()_+|<>?:{}.,/;='"]/;
// 	return check.test(value);
// }


return (
	<StyledWrapper>
		<div>
			{/* <Button variant="outlined" onClick={handleClickOpen}>
			{ tableNum }번 테이블
			</Button> */}
				{/* <img src={ roomsign } alt="" onClick={handleClickOpen} id="image"/> */}
			<div id="image-box">
				<img src={ table_empty } alt="" onClick={handleClickOpen} id="image"/>
			</div>
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
					<Button>
					<Link to={`/restaurant/+${restaurantId}/conference/${tableNum}`} state={{ title: titleValue, people: peopleValue }} id="link">
						만들기
					</Link>
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	</StyledWrapper>
);
};

const StyledWrapper = styled.div`
	#image-box{
		width: 24vw;
		display:flex;
		align-items: center;
		justify-content: center;
	}
	#image{
		cursor: pointer;
		max-width: 90%;
		max-height: 90%;
		-webkit-filter: brightness(70%);
		-webkit-transition: all 1s ease;
		-moz-transition: all 1s ease;
		-o-transition: all 1s ease;
		-ms-transition: all 1s ease;
		transition: all 1s ease;
	}
	#image:hover{
		-webkit-filter: brightness(120%);
	}
`;