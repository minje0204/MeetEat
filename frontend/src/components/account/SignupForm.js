<<<<<<< HEAD
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
=======
import styled from "styled-components";
import { Button, TextField } from "@mui/material";
export default function SignupForm() {
  return (
    <StyledWrapper>
      <h1>회원가입</h1>
      <div className="mx-auto w-64 text-center ">
        <div class="relative w-64">
          <img
            className="w-64 h-64 rounded-full absolute"
            src="https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt=""
          />
          <div className="w-64 h-64 group hover:bg-gray-200 opacity-60 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500">
            <img
              className="hidden group-hover:block w-12"
              src="https://www.svgrepo.com/show/33565/upload.svg"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="input-container">이름 : </div>
      <div className="input-container"> 이메일 : </div>
      <div className="input-container">
        <p>닉네임 : </p>
        <TextField
          required
          id="standard-required"
          label="필수 입력 항목"
          variant="standard"
        />
        <Button variant="contained">중복 확인</Button>
      </div>
      <div className="button-group">
        <Button variant="contained">저장</Button>
        <Button variant="contained">회원가입 취소</Button>
      </div>
    </StyledWrapper>
  );
}
const StyledWrapper = styled.div`
   {
    width: 500px;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .input-container {
    width: 80%;
    display: flex;
    justify-content: space-between;
    margin: 1rem;
  }
  .button-group {
    width: 80%;
    display: flex;
    justify-content: space-evenly;
    margin: 1rem;
>>>>>>> 34e41222e4e50990f8624f3020c238c6bb6b8ee4
  }
`;
