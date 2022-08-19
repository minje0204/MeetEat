import * as React from "react";
import styled from "@emotion/styled";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import menu_rounded from "assets/img/menu_rounded.png";
import Axios from "utils/axios/Axios";
import { toast } from "react-toastify";

export default function PersonalMenu(props) {
  const { idx, host } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchTarget, setSearchTarget] = React.useState("");
  const open = Boolean(anchorEl);
  const [videoStatus, setVideoStatus] = React.useState(true);
  const video = document.querySelector(`#personal-${idx} video`);
  const videoBan = document.querySelector(`#personal-${idx} #videoBan`);
  const audioBan = document.querySelector(`#personal-${idx} #audioBan`);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleRequest = () => {
    const target = document.querySelector(
      `#personal-${idx} #personal_id`,
    ).innerText;
    Axios.get(`/user/search?nickname=${target}`).then(res => {
      setSearchTarget(res.data.response[0].id);
    }).then(() => {
      Axios.post(`/friend/request/${searchTarget}`)
    }).then(() => {
      toast.success("밥친구 요청을 보냈습니다.", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    })
  };
  const handleAudio = () => {
    if (video) {
      video.muted = !video.muted;

      if (video.muted) {
        audioBan.innerText = "오디오 차단됨 \n";
      } else {
        console.log(audioBan);
        audioBan.innerText = "";
      }
    }
    handleClose();
  };
  const handleVideo = idx => {
    if (videoStatus) {
      video.style.display = "none";
      videoBan.innerText = "비디오 차단됨 \n";
    } else {
      video.style.display = "";

      videoBan.innerText = "";
    }
    setVideoStatus(!videoStatus);
    handleClose();
  };

  return (
    <StyledWrapper>
      {video && (
        <img
          src={menu_rounded}
          width="20px"
          height="20px"
          id="option"
          alt="메뉴"
          onClick={handleClick}
          aria-controls={open ? "basic-menu" : undefined}
        />
      )}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/* <MenuItem
          onClick={handleClose}
          sx={{ color: "black", fontFamily: "Jua" }}
        >
          프로필 보기
        </MenuItem> */}
        <MenuItem
          onClick={handleRequest}
          sx={{ color: "black", fontFamily: "Jua" }}
        >
          친구 요청
        </MenuItem>
        <MenuItem
          onClick={handleAudio}
          sx={{ color: "black", fontFamily: "Jua" }}
        >
          {video && (video.muted ? "오디오 차단 해제" : "오디오 차단")}
          {!video && "음소거"}
        </MenuItem>
        <MenuItem
          onClick={handleVideo}
          sx={{ color: "black", fontFamily: "Jua" }}
        >
          {videoStatus ? "비디오 차단" : "비디오 차단 해제"}
        </MenuItem>
      </Menu>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  #option {
    cursor: pointer;
  }
`;
