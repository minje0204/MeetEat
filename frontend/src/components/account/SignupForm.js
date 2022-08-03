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
  }
`;
