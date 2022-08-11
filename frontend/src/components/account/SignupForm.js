import { useState } from "react";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { CheckLength } from "utils/filters/CheckLength";
import ProfileImage from "./ProfileImage";
import { Link } from "react-router-dom";
import Nickname from "./Nickname";
import Axios from "utils/axios/Axios";

export default function SignupForm() {
  const [Image, setImage] = useState(
    "/images/profile_image/default_profile.png",
  );

  const [nickname, setNickname] = useState("");
  const [checkedNickname, setCheckedNickname] = useState("");
  const [validNickname, setValidNickname] = useState(false);
  const isValid = value => setValidNickname(value);

  const [selfMessage, setSelfMessage] = useState("");
  const selfMessageInput = e => setSelfMessage(e.target.value);
  let params = new URL(document.location).searchParams;
  const email = params.get("email");

  const signupPost = () => {
    if (!validNickname) {
      alert("유효하지 않은 별명입니다. ");
    } else if (!checkedNickname || nickname !== checkedNickname) {
      alert("별명 중복확인이 필요합니다. ");
    } else {
      const data = {
        email: email,
        nickname: checkedNickname,
        self_message: selfMessage,
        profile_image: Image,
      };
      console.log(data);
      Axios.post(`http://localhost:8080/auth/signup`, {
        data: data,
      })
        .then(res => {
          console.log(res);
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
        <ProfileImage Image={Image} setImage={setImage}></ProfileImage>

        <div className="form-row">
          <p>이메일 </p>
          <p className="personal-data">{email}</p>
        </div>
        <Nickname
          nickname={nickname}
          setNickname={setNickname}
          setCheckedNickname={setCheckedNickname}
          validNickname={validNickname}
          isValid={isValid}
        ></Nickname>
        <p id="nickname-alert">별명은 2~8글자 한글, 영문, 숫자만 가능합니다</p>
        <div className="wide-p">
          자기 소개
          <span id="text-length">{`<${selfMessage.length}/40>`}</span>
        </div>
        <div className="form-row">
          <TextField
            onChange={selfMessageInput}
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
