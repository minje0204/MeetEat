import * as React from "react";
import styled from "@emotion/styled";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import menu_rounded from "assets/img/menu_rounded.png";

export default function PersonalMenu(props) {
  const { idx, host } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const video = document.querySelector(`#personal-${idx} video`);
  const [videoStatus, setVideoStatus] = React.useState(true);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAudio = () => {
    if (video) {
      video.muted = !video.muted;
    }
    handleClose();
  };
  const handleVideo = () => {
    if (videoStatus) {
      video.style.display = "none";
    } else {
      video.style.display = "";
    }
    setVideoStatus(!videoStatus);
    handleClose();
  };

  return (
    <StyledWrapper>
      <img
        src={menu_rounded}
        width="20px"
        height="20px"
        id="option"
        alt="메뉴"
        onClick={handleClick}
        aria-controls={open ? "basic-menu" : undefined}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={handleClose}
          sx={{ color: "black", fontFamily: "Jua" }}
        >
          프로필 보기
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{ color: "black", fontFamily: "Jua" }}
        >
          귓속말 하기
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{ color: "black", fontFamily: "Jua" }}
        >
          친구 요청
        </MenuItem>
        <MenuItem
          onClick={handleAudio}
          sx={{ color: "black", fontFamily: "Jua" }}
        >
          {video && (video.muted ? "음소거 해제" : "음소거 하기")}
          {!video && "음소거"}
        </MenuItem>
        <MenuItem
          onClick={handleVideo}
          sx={{ color: "black", fontFamily: "Jua" }}
        >
          {videoStatus ? "비디오 숨기기" : "비디오 보이기"}
        </MenuItem>
        {/* 방장일 경우 아래 내용 추가 */}
        {/* <MenuItem onClick={handleClose} sx={{ color: "black", fontFamily: "Jua" }}>방장 넘기기</MenuItem>
      <MenuItem onClick={handleClose} sx={{ color: "black", fontFamily: "Jua" }}>강제 추방</MenuItem> */}
      </Menu>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  #option {
    cursor: pointer;
  }
`;
