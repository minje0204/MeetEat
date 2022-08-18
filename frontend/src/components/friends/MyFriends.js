import * as React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import option from "assets/img/option.png";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Axios from "utils/axios/Axios";
import FriendsProfileDialog from "components/profile/FriendsProfileDialog";
import { useNavigate } from "react-router-dom";

function FriendsListOption(props) {
  const { open, onClose, anchorEl, truefriends, conferenceId, idx } = props;
  const navigate = useNavigate();
  const handleClose = () => {
    onClose();
  };
  const HandleDelete = idx => {
    Axios.delete(`/friend/delete/${idx}`).then(() => {
      Axios.get(`/friend`).then(res => {
        truefriends(res.data.response);
      });
    });
    onClose();
  };
  const GoToFriend = conferenceId => {
    console.log(conferenceId);
    Axios.get(`/restaurant/conference/${encodeURI(conferenceId)}`).then(
      response => {
        if (response.data.status === 200) {
          window.sessionStorage.setItem("conferencePermission", true);
          navigate(`/restaurant/conference/${conferenceId}`, {
            state: {
              title: response.data.response.title,
              peopleLimit: response.data.response.maxUserNum,
              userName: sessionStorage.getItem("nickname"),
              conferenceId,
              restaurantId: response.data.response.restaurant,
              position: response.data.response.position,
            },
          });
        } else {
          alert("요청하신 식탁은 입장이 불가능해요.");
        }
      },
    );
  };

  return (
    <Menu
      id="basic-menu"
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      PaperProps={{
        style: {
          boxShadow: "none",
          border: "3px solid #EFD345",
          borderRadius: "10px",
          backgroundColor: "#FFEF82",
        },
      }}
    >
      {conferenceId == null ? (
        <MenuItem disabled sx={{ color: "grey", fontFamily: "Jua" }}>
          친구 따라가기
        </MenuItem>
      ) : (
        <MenuItem
          onClick={event => GoToFriend(conferenceId)}
          sx={{ color: "black", fontFamily: "Jua" }}
        >
          친구 따라가기
        </MenuItem>
      )}
      <MenuItem
        onClick={event => HandleDelete(idx)}
        sx={{ color: "#FF0063", fontFamily: "Jua" }}
      >
        친구 삭제하기
      </MenuItem>
    </Menu>
  );
}

export default function MyFriends() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [friendsWithMe, setFriendsWithMe] = React.useState([]);
  const openOption = Boolean(anchorEl);
  const clickOption = event => {
    setAnchorEl(event.currentTarget);
  };
  const closeOption = () => {
    setAnchorEl(null);
  };

  function truefriends(data) {
    const dataList = [];
    for (let i = 0; i < data.length; i++) {
      let user = data[i];

      if (user.status === 1) {
        dataList.push(user);
      }
    }
    setFriendsWithMe(dataList);
  }

  React.useEffect(() => {
    Axios.get(`/friend`).then(res => {
      truefriends(res.data.response);
    });
  }, []);

  const friendsList = friendsWithMe.map((e, idx) => (
    <div id="friend-each" key={`${idx}`}>
      <div id="icon-nickname">
        <div id="imgsquare">
          <div id="imgbox">
            <img
              src={
                e.friendInfo.profile !== null
                  ? e.friendInfo.profile
                  : "/images/profile_image/default_profile.png"
              }
              id="image"
              alt={`사진 ${idx}`}
            />
          </div>
          {e.conferenceId == null ? (
            <div id="status-offline" />
          ) : (
            <div id="status-online" />
          )}
        </div>
        <div id="nickname">{e.friendInfo.nickname}</div>
      </div>
      <div id="profile-menu">
        <Button variant="outlined" id="profile">
          <FriendsProfileDialog who={e.friendInfo.id} friendIcon={e.friendInfo.profile} />
        </Button>
        <img
          src={option}
          onClick={clickOption}
          width="20px"
          height="20px"
          id="option"
          alt="메뉴"
        />
        <FriendsListOption
          open={openOption}
          anchorEl={anchorEl}
          onClose={closeOption}
          truefriends={truefriends}
          conferenceId={e.conferenceId}
          idx={e.friendInfo.id}
        />
      </div>
    </div>
  ));

  return (
    <StyledWrapper>
      <div id="friend-whole">
        {friendsList.length === 0 ? "친구를 추가해주세요!" : friendsList}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  #friend-whole {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #friend-each {
    height: 70px;
    width: 90%;
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    border: 4px solid #efd345;
    border-radius: 20px;
  }
  #icon-nickname {
    font-family: "Jua";
    font-size: 24px;
    display: flex;
    align-items: center;
  }
  #imgsquare {
    height: 50px;
    width: 50px;
    margin: 0 10px;
    display: flex;
  }
  #imgbox {
    height: 50px;
    width: 50px;
    border: 2px solid black;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: absolute;
  }
  #image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  #profile-menu {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    align-items: center;
  }
  #profile {
    margin-left: 10px;
    padding: 2px 2px;
    border-color: black;
    font-family: "Jua";
    font-size: 16px;
    color: black;
    background-color: #efd345;
  }
  #option {
    margin-right: 10px;
    cursor: pointer;
  }
  #status-online {
    width: 13px;
    height: 13px;
    position: relative;
    top: 75%;
    left: 78%;
    background-color: #5bb318;
    border-radius: 50%;
    border: 1.6px solid black;
  }
  #status-offline {
    width: 13px;
    height: 13px;
    position: relative;
    top: 75%;
    left: 78%;
    background-color: grey;
    border-radius: 50%;
    border: 1.6px solid black;
  }
`;
