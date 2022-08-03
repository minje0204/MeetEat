import { useState } from "react";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import Button from "@mui/material/Button";

export default function SignupForm() {
  const [nickname, setNickname] = useState("");
  const nicknameInput = e => setNickname(e.target.value);
  return (
    <StyledWrapper>
      <div className="form-container">
        <h2>회원가입</h2>
        <div>
          <input
            type="file"
            accept="image/jpg,impge/png,image/jpeg,image/gif"
            name="profile_img"
          ></input>
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
  #nickname-p {
    margin: 1rem;
  }
  #nickname {
    display: flex;
    justify-content: space-between;
  }
  .form-container {
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
