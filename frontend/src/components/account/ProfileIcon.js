import * as React from "react";
import styled from "styled-components";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ProfileDialog from "components/profile/ProfileDialog";
import { Link } from "react-router-dom";

export default function ProfileIcon() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const profile = window.sessionStorage.getItem("profile");
  const userID = window.sessionStorage.getItem("id");
  const logOut = () => {
    window.sessionStorage.clear();
    localStorage.clear();
    window.location.href = `${process.env.REACT_APP_CLIENT_PROTOCOL}://${process.env.REACT_APP_CLIENT_URL}/`;
  };
  return (
    <StyledWrapper>
      <div id="imgbox">
        <img
          src={
            profile && profile !== "null"
              ? profile
              : "/images/profile_image/default_profile.png"
          }
          id="icon"
          alt="아이콘"
          onClick={handleClick}
          aria-controls={open ? "basic-menu" : undefined}
        />
        <Menu
          id="basic-menu"
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <StyledWrapperLink>
            <MenuItem sx={{ color: "black", fontFamily: "Jua" }}>
              <ProfileDialog userID={userID} />
            </MenuItem>
            <Link to="/user/edit">
              <MenuItem
                onClick={handleClose}
                sx={{ color: "black", fontFamily: "Jua" }}
              >
                회원정보 수정
              </MenuItem>
            </Link>
            <MenuItem
              onClick={e => {
                handleClose(e);
                logOut();
              }}
              sx={{ color: "#FF0063", fontFamily: "Jua" }}
            >
              로그아웃
            </MenuItem>
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
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StyledWrapperLink = styled.div`
  a {
    text-decoration: none;
  }
`;
