import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import closebutton from "assets/img/closebutton.png";
import ProfileDialogDetail from "components/profile/ProfileDialogDetail";
import * as React from "react";
import Axios from "utils/axios/Axios";

export default function ProfileDialog(props) {
  const { userID } = props;
  const [open, setOpen] = React.useState(false);
  const [openDetail, setOpenDetail] = React.useState(false);
  const [tableDetail, setTableDetail] = React.useState();
  const [profileInfo, setProfileInfo] = React.useState();
  const profile = window.sessionStorage.getItem("profile");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const clickDetail = id => {
    Axios.get(`tray/${id}`)
      .then(({ data }) => {
        setTableDetail(data.response);
        setOpenDetail(true);
      })
      .catch(e => console.log(e));
  };
  const detailClose = () => {
    setOpenDetail(false);
  };

  React.useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = () => {
    Axios.get(`/user/${userID}`).then(res => {
      console.log(res);
      setProfileInfo(res.data.response);
    });
  };

  return (
    <>
      <div onClick={handleClickOpen}>프로필 보기</div>
      {profileInfo && (
        <Dialog maxWidth="lg" open={open} onClose={handleClose}>
          <StyledWrapper>
            <div id="return-exit">
              <img
                src={closebutton}
                id="exit-icon"
                alt="창닫기"
                onClick={handleClose}
              />
            </div>
            <div id="myiconbox">
              <div id="myicon-layout">
                <img
                  src={
                    profile && profile !== "null"
                      ? profile
                      : "/images/profile_image/default_profile.png"
                  }
                  id="myicon"
                  alt="사진"
                />
              </div>
            </div>
            <Box id="nickname-hello" component="form">
              <div>별명 : {profileInfo.nickname}</div>
              <div>
                {profileInfo.bio
                  ? `소개 : ${profileInfo.bio}`
                  : "등록된 자기소개가 없습니다."}
              </div>
            </Box>
            <hr id="horizon-line" />
            <div id="album">
              <div id="table-album">
                {profileInfo.trayAlbum.length === 0
                  ? "앨범에 추억을 저장해보는건 어떨까요?"
                  : profileInfo.trayAlbum.map(e => (
                      <div key={`table${e.id}`}>
                        <div
                          id="example-table"
                          onClick={() => clickDetail(e.id)}
                        >
                          <img
                            src={e.image}
                            className={"table-album-image"}
                          ></img>
                        </div>
                        <ProfileDialogDetail
                          open={openDetail}
                          onClose={detailClose}
                          id={e.id}
                          fetchUserProfile={fetchUserProfile}
                          tableDetail={tableDetail}
                          imageSource={e.image}
                        />
                        {e.id}번째 식탁
                      </div>
                    ))}
              </div>
            </div>
          </StyledWrapper>
        </Dialog>
      )}
    </>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  align-items: center;

  .table-album-image {
    width: 100%;
  }
  a {
    text-decoration: none;
  }
  #return-exit {
    position: sticky;
    top: 30px;
    width: 100%;
    height: 10px;
    margin: 40px 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  #btn:hover {
    background-color: #82954b;
  }
  #return-icon {
    width: 30px;
    height: 30px;
    margin-right: 5px;
  }
  #exit-icon {
    cursor: pointer;
    width: 40px;
    margin-left: 20px;
    display: flex;
    align-items: center;
  }
  #myiconbox {
    width: 100%;
    height: 15vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2vh 0;
  }
  #myicon-layout {
    height: 100px;
    width: 100px;
    border: 2px solid black;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  #myicon {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  #nickname-hello {
    height: 10vh;
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    font-family: "Jua";
    font-size: 20px;
    flex-direction: column;
  }
  #nickname {
    width: 100%;
    justify-content: center;
    align-items: center;
    margin: 0 1vh;
  }
  #introduce {
    width: 100%;
    justify-content: center;
    align-items: center;
    margin: 0 1vh;
  }
  #horizon-line {
    margin: 30px 0 20px;
    width: 1100px;
    border: 0;
    height: 1px;
    background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.75),
      rgba(0, 0, 0, 0)
    );
  }
  #album {
    width: 100%;
    height: 43vh;
    display: flex;
    justify-content: center;
  }
  #table-album {
    width: 1100px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    font-family: "Jua";
    font-size: 17px;
  }
  #example-table {
    background-color: #888888;
    width: 305.5px;
    height: 130px;
    margin: 20px 0;
    cursor: pointer;
  }
  #example-table:hover {
    border: 3px solid #efd345;
    margin: 17px -3px;
  }
`;
