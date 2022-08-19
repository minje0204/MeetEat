import { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import ProfileImage from "./ProfileImage";
import Axios from "utils/axios/Axios";
import Nickname from "./Nickname";
import BioInput from "./BioInput";
import { toast } from "react-toastify";

export default function EditForm() {
  const myBio = sessionStorage.getItem("bio");
  const [Image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [preview, setPreview] = useState(
    "/images/profile_image/default_profile.png",
  );
  const [nickname, setNickname] = useState(
    sessionStorage.getItem("nickname") === null
      ? ""
      : sessionStorage.getItem("nickname"),
  );
  const [checkedNickname, setCheckedNickname] = useState("");
  const [validNickname, setValidNickname] = useState(false);
  const isValid = value => setValidNickname(value);
  const [bio, setBio] = useState(myBio);
  useEffect(() => {
    Axios.get("user/me").then(res => {
      if (res.data.response.profile !== null) {
        setPreview(res.data.response.profile);
        setCheckedNickname(res.data.response.nickname);
        setNickname(res.data.response.nickname);
        setValidNickname(true);
        setBio(res.data.response.bio);
        setEmail(res.data.response.email);
      }
    });
  }, []);

  const profileEditHandler = e => {
    const bodyFormData = new FormData();
    bodyFormData.append("file", Image);
    Axios.patch("/user/profile", bodyFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    })
      .then(res => {
        sessionStorage.setItem("profile", res.data.response.profile);
        toast.success("프로필 사진이 변경되었습니다.", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  const profileDeleteHandler = e => {
    Axios.delete("/user/profile")
      .then(res => {
        sessionStorage.setItem("profile", "");
        toast.success("프로필 사진이 삭제되었습니다.", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  const nicknameEditHandler = e => {
    if (!validNickname) {
      toast.error("유효하지 않은 닉네임입니다.", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } else if (!checkedNickname || nickname !== checkedNickname) {
      toast.error("닉네임 중복확인이 필요합니다.", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } else {
      Axios.patch("/user/nickname", { nickname: checkedNickname })
        .then(res => {
          sessionStorage.setItem("nickname", res.data.response.nickname);
          toast.success("닉네임이 변경되었습니다.", {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  const bioEditHandler = e => {
    Axios.patch("/user/bio", { bio: bio })
      .then(res => {
        sessionStorage.setItem("bio", res.data.response.bio);
        toast.success("자기 소개가 변경되었습니다.", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <StyledWrapper>
      <div className="form-container">
        <h2>회원정보 수정</h2>
        <div className="wide-p">프로필 사진</div>
        <ProfileImage
          setImage={setImage}
          preview={preview}
          setPreview={setPreview}
        ></ProfileImage>
        <div className="button-group">
          <Button
            disabled={!Image}
            variant="contained"
            className="btn-wide"
            onClick={profileEditHandler}
          >
            사진 저장
          </Button>
          <Button
            variant="contained"
            className="btn-wide"
            onClick={profileDeleteHandler}
          >
            사진 삭제
          </Button>
        </div>
        <div className="form-row">
          <p>이메일 </p>
          <p className="personal-data">{email}</p>
        </div>
        <div className="form-row">
          <p>닉네임 </p>
          <Nickname
            nickname={nickname}
            setNickname={setNickname}
            setCheckedNickname={setCheckedNickname}
            validNickname={validNickname}
            isValid={isValid}
          ></Nickname>
        </div>
        <p id="nickname-alert">
          닉네임은 2~6글자 한글, 영문, 숫자만 가능합니다
        </p>
        <div className="button-group">
          <Button
            variant="contained"
            className="btn-wide"
            onClick={nicknameEditHandler}
          >
            닉네임 저장
          </Button>
        </div>
        <div className="wide-p">
          자기 소개
          <span id="text-length">{`<${bio.length}/40>`}</span>
        </div>
        <div className="form-row">
          <BioInput bio={bio} setBio={setBio}></BioInput>
        </div>
        <div className="button-group">
          <Button
            variant="contained"
            className="btn-wide"
            onClick={bioEditHandler}
          >
            자기소개 저장
          </Button>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button-group {
    display: flex;
    justify-content: center;
    margin: 1rem 0 0 0;
  }
  .btn-wide {
    width: 14rem;
  }
  #nickname-alert {
    font-size: 1rem;
    margin: 0;
    text-align: center;
  }
  a {
    text-decoration: none;
  }
  div {
    font-family: "Jua";
    font-size: 1.3rem;
    color: black;
  }
  label {
    font-family: "Jua";
  }
  input {
    font-size: 1rem;
  }
  h2 {
    text-align: center;
    margin: 0;
  }
  .wide-p {
    margin-top: 1rem;
    margin-bottom: 0;
    display: flex;
    justify-content: space-between;
  }
  .wide-p: #text-length {
    font-size: 0.6rem;
    font-weight: none;
  }
  .form-row {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .personal-data {
    width: 360px;
    text-align: center;
  }
  .form-container {
    min-width: 480;
    width: 480px;
    margin: auto;
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  button {
    font-family: "Jua";
    font-size: 1.5rem;
    color: black;
    padding: 0em 0.5em;
    border-width: 1px;
    border-color: #babd42;
    margin: 0px 4px;
    background-color: #babd42;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
    transition: top 0.01s linear;
    text-shadow: none;
    box-shadow: none;
  }

  button:hover {
    box-shadow: none;
    background-color: #82954b;
  }
`;
