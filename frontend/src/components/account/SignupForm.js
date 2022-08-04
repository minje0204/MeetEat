import { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import Button from "@mui/material/Button";

export default function SignupForm() {
  const [nickname, setNickname] = useState("");
  const nicknameInput = e => setNickname(e.target.value);

  let name = "최영찬";
  let email = "youngchan419@gmail.com";
  const [Image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  );
  const fileInput = useRef(null);

  const onChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  return (
    <StyledWrapper>
      <div className="form-container">
        <h2>회원가입</h2>
        <div className="profile-image-container">
          <div id="profile-image-area">
            <img
              id="profile-image"
              alt="profile_image"
              src={Image}
              onClick={() => {
                fileInput.current.click();
              }}
            />
          </div>
          <i
            className="fa-solid fa-circle-plus"
            onClick={() => {
              fileInput.current.click();
            }}
          ></i>

          <input
            type="file"
            style={{ display: "none" }}
            accept="image/jpg,image/png,image/jpeg"
            name="profile_img"
            onChange={onChange}
            ref={fileInput}
          />
        </div>

        <div className="form-row">
          <p id="nickname-p">이름</p>
          <p className="personal-data">{name}</p>
        </div>
        <div className="form-row">
          <p id="nickname-p">이메일 </p>
          <p className="personal-data">{email}</p>
        </div>
        <div className="form-row">
          <p id="nickname-p">별명 </p>
          <TextField
            onChange={nicknameInput}
            required
            id="nickname-input"
            label="필수 입력 항목"
            variant="standard"
          />
          <Button variant="contained">중복 확인</Button>
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
   {
    font-family: "Jua";
    font-size: 1.5rem;
    color: black;
  }
  h2 {
    text-align: center;
    margin: 0;
  }
  #profile-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  #profile-image-area {
    width: 200px;
    height: 200px;
    overflow: hidden;
    border-radius: 50%;
    border: 1px solid #crimson;
  }
  #profile-image-area:hover {
    cursor: pointer;
  }
  .profile-image-container {
    width: 200px;
    height: 200px;

    position: relative;
    margin: 2rem auto;
  }
  .profile-image-container > i {
    font-size: 2rem;
    position: absolute;
    right: 9px;
    bottom: 9px;
  }
  .profile-image-container > i:hover {
    cursor: pointer;
  }
  .form-row {
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
