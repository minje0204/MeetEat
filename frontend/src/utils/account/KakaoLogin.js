import styled from "styled-components";

export default function KakaoLogin() {
  const REST_API_KEY = "2a97016e9f66dff3fdad3046d1ee9a9b";
  const REDIRECT_URI = "http://localhost:3000/login";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  function handleLogin() {
    window.location.href = KAKAO_AUTH_URL;
  }

  return (
    <StyledWrapper>
      <a id="kakao-login" className="login-button" href={KAKAO_AUTH_URL}>
        <img className="login-image" src="/images/login/kakao_login.png"></img>
      </a>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
   {
    width: 75%;
    margin: 2px auto;
  }
  .login-button {
    text-align: center;
  }
  .login-image {
    width: 100%;
  }
`;
