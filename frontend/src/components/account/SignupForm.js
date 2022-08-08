import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { CheckLength } from "utils/filters/CheckLength";
import ProfileImage from "./ProfileImage";
import NicknameFilter from "utils/filters/NicknameFilter";

export default function SignupForm() {
  const [Image, setImage] = useState(
    "/images/profile_image/default_profile.png",
  );

  const [nickname, setNickname] = useState("");
  const nicknameInput = e => setNickname(e.target.value);

  const [validNickname, setValidNickname] = useState(true);

  const [selfMessage, setSelfMessage] = useState("");
  const selfMessageInput = e => setSelfMessage(e.target.value);

  let email = "youngchan419@gmail.com";

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
        <div className="form-row">
          <p>별명 </p>
          <div className="nickname-input-group">
            <TextField
              onChange={e => {
                nicknameInput(e);
              }}
              onInput={e => CheckLength(e, 8)}
              required
              inputProps={{ maxLength: "40" }}
              id="nickname-input"
              label="필수 입력 항목"
            />
            <Button variant="contained">중복 확인</Button>
          </div>
        </div>
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
          <Button variant="contained">저장</Button>
          <Button variant="contained" id="signup-cancel">
            회원가입 취소
          </Button>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
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
  #nickname-input {
    width: 200px;
  }
  #text-length {
    font-size: 1rem;
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
  .nickname-input-group {
    display: flex;
    align-items: center;
  }
  .button-group {
    display: flex;
    justify-content: space-between;
    margin: 2rem 0;
  }
  .button-group > button {
    background-color: #babd42;
    width: 14rem;
  }
  .button-group > button:hover {
    background-color: #82954b;
  }
  button {
    font-family: "Jua";
    font-size: 1.5rem;
    color: black;
    padding: 0em 0.5em;
    border-width: 1px;
    border-color: #e2dcc8;
    margin: 0px 4px;
    background-color: #ffef82;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
    transition: top 0.01s linear;
    text-shadow: none;
    box-shadow: none;
    height: 3rem;
  }
  button:hover {
    background-color: #efd345;
    box-shadow: none;
  }
`;
