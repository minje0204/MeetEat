import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { toUpper } from "lodash";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Axios from "utils/axios/Axios";
import { CheckLength } from "utils/filters/CheckLength";
import Nickname from "./Nickname";
import { toast } from "react-toastify";
import ProfileImage from "./ProfileImage";

export default function SignupForm() {
  const location = useLocation();

  const [Image, setImage] = useState("");
  const [preview, setPreview] = useState(
    "/images/profile_image/default_profile.png",
  );

  const [nickname, setNickname] = useState("");
  const [checkedNickname, setCheckedNickname] = useState("");
  const [validNickname, setValidNickname] = useState(false);
  const isValid = value => setValidNickname(value);

  const [bio, setBio] = useState("");
  const bioInput = e => setBio(e.target.value);
  const email = location.state.email;
  const provider = location.state.provider;
  const code = location.state.code;
  const redirect_uri = location.state.redirect_uri;

  const signupPost = () => {
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
      toast.error("닉네임 중복확인이 필요합니다. ", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } else {
      const bodyFormData = new FormData();
      const data = {
        email: email,
        nickname: checkedNickname,
        bio: bio,
        provider: toUpper(`${provider}`),
      };
      const blobData = new Blob([JSON.stringify(data)], {
        type: "application/json",
      });
      bodyFormData.append("data", blobData);
      bodyFormData.append("file", Image);

      Axios.post("/auth/signup", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      })
        .then(res => {
          localStorage.setItem("accessToken", res.data.response.accessToken);
          Axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.response.accessToken}`;
          window.sessionStorage.setItem("logged", true);
          window.sessionStorage.setItem("nickname", res.data.response.nickname);
          window.sessionStorage.setItem("email", res.data.response.email);
          window.sessionStorage.setItem("bio", res.data.response.bio);
          window.sessionStorage.setItem("profile", res.data.response.profile);
          window.sessionStorage.setItem(
            "accessToken",
            res.data.response.accessToken,
          );
          window.location.href = `${process.env.REACT_APP_CLIENT_PROTOCOL}://${process.env.REACT_APP_CLIENT_URL}/`;
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  return (
    <StyledWrapper>
      <div className="form-container">
        <h2>회원정보 입력</h2>
        <div className="wide-p">프로필 사진</div>
        <ProfileImage
          setImage={setImage}
          preview={preview}
          setPreview={setPreview}
        ></ProfileImage>
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
        <div className="wide-p">
          자기 소개
          <span id="text-length">{`<${bio.length}/40>`}</span>
        </div>
        <div className="form-row">
          <TextField
            onChange={bioInput}
            onInput={e => CheckLength(e, 40)}
            fullWidth
            id="fullWidth"
            placeholder="자기소개를 입력해주세요."
          />
        </div>
        <div className="button-group">
          <Button variant="contained" className="btn-wide" onClick={signupPost}>
            저장
          </Button>
          <Link to="/">
            <Button variant="contained" className="btn-wide" id="signup-cancel">
              회원가입 취소
            </Button>
          </Link>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
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

  .button-group {
    display: flex;
    justify-content: space-between;
    margin: 2rem 0;
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
    height: 3rem;
  }

  button:hover {
    box-shadow: none;
    background-color: #82954b;
  }

  .btn-wide {
    width: 14rem;
  }
`;
