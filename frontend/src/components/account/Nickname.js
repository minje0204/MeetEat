import Axios from "utils/axios/Axios";
import NicknameFilter from "utils/filters/NicknameFilter";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { CheckLength } from "utils/filters/CheckLength";

export default function Nickname(props) {
  const { nickname, setNickname, validNickname, isValid, setCheckedNickname } =
    props;

  const nicknameInput = e => setNickname(e.target.value);

  const checkNickname = () => {
    Axios.get(`/user/exists/${nickname}`, {
      nickname: nickname,
    })
      .then(res => {
        if (res.data.response.exists) {
          //true인 경우 중복 닉네임 있음
          alert("이미 사용중인 닉네임입니다.");
        } else {
          console.log(res);
          alert("사용 가능한 닉네임입니다");
          setCheckedNickname(res.data.response.nickname);
        }
      })
      .catch(err => console.log(err));
  };
  return (
    <StyledWrapper className="form-row">
      <p>닉네임 </p>
      <div className="nickname-input-group">
        <TextField
          onChange={e => {
            nicknameInput(e);
            isValid(NicknameFilter(e));
          }}
          error={Boolean(nickname && !validNickname)}
          onInput={e => CheckLength(e, 6)}
          required
          id="nickname-input"
          label="필수 입력 항목"
        />
        <Button
          variant="contained"
          onClick={checkNickname}
          disabled={!validNickname}
        >
          중복 확인
        </Button>
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
  #nickname-input {
    width: 200px;
  }
  #text-length {
    font-size: 1rem;
  }
  .nickname-input-group {
    display: flex;
    align-items: center;
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
