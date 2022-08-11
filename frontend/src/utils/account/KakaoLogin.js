import styled from "styled-components";

export default function KakaoLogin() {
  const REST_API_KEY = "add here";
  const REDIRECT_URI = "http://localhost:3000/login/kakao";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <StyledWrapper>
      <a id="kakao-login" className="login-button" href={KAKAO_AUTH_URL}>
        <img
          className="login-image"
          src="/images/login/kakao_login.png"
          alt="kakao_login"
        ></img>
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
