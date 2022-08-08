import styled from "styled-components";

export default function NaverLogin() {
  const client_id = "add here";
  const redirectURI = encodeURI("http://localhost:3000/login-naver");
  const state = encodeURI("http://localhost:3000/");
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirectURI}&state=${state};`;

  function handleLogin() {
    window.location.href = NAVER_AUTH_URL;
  }

  return (
    <StyledWrapper>
      <a id="naver-login" className="login-button" href={NAVER_AUTH_URL}>
        <img className="login-image" src="/images/login/naver_login.png"></img>
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
