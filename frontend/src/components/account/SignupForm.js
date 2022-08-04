import { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import Button from "@mui/material/Button";

export default function SignupForm() {
  const [nickname, setNickname] = useState("");
  const nicknameInput = e => setNickname(e.target.value);

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

        <div>
          <p id="nickname-p">이름 : </p>
        </div>
        <div>
          <p id="nickname-p">이메일 : </p>
        </div>
        <div id="nickname">
          <p id="nickname-p">별명 : </p>
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
          <Button variant="contained">회원가입 취소</Button>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  h2 {
    text-align: center;
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
    margin: 0 auto;
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
  #nickname-p {
    margin: 1rem;
  }
  #nickname {
    display: flex;
    justify-content: space-between;
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
    justify-content: space-evenly;
    margin: 2rem;
  }
`;
