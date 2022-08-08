import * as React from 'react';
import styled from "styled-components";
import hotdog from "assets/img/hotdog.png"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";

export default function ProfileIcon() {
	const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
	const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

	return(
	<StyledWrapper>
		<div id="imgbox">
			<img src={ hotdog } id="icon" alt="아이콘" onClick={handleClick} 
			aria-controls={open ? 'basic-menu' : undefined} />
			<Menu
        id="basic-menu"
        open={open}
				anchorEl={anchorEl}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
			<StyledWrapperLink>
				<Link to={"/profile"} id="profile">
					<MenuItem onClick={handleClose} sx={{ color: "black", fontFamily: "Jua" }}>나의 프로필</MenuItem>
				</Link>
				<MenuItem onClick={handleClose} sx={{ color: "black", fontFamily: "Jua" }}>개인정보 관리</MenuItem>
				<MenuItem onClick={handleClose} sx={{ color: "#FF0063", fontFamily: "Jua" }}>로그아웃</MenuItem>
			</StyledWrapperLink>
    </Menu>
		</div>
	</StyledWrapper>
	);
}

const StyledWrapper = styled.div`
	cursor: pointer;
	#imgbox {
		height: 50px;
		width: 50px;
		margin: 0 10px;
		border: 2px solid black;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}
	#icon {
    width: 90%;
    height: 90%;
    object-fit: cover;
  }
`;

const StyledWrapperLink = styled.div`
	a {
		text-decoration: none;
	}
`;