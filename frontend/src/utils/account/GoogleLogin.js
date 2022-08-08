import styled from "styled-components";

export default function GoogleLogin() {
  const client_id =
    "912257842954-povfeqnej4fse9crrdfa5mrlebtvpv1p.apps.googleusercontent.com";
  const redirectURI = encodeURI("http://localhost:3000/login");
  const state = encodeURI("http://localhost:3000/");
  const scope = "https://www.googleapis.com/auth/userinfo.email";
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirectURI}&response_type=code&state=${state}&scope=${scope}`;

  function handleLogin() {
    window.location.href = GOOGLE_AUTH_URL;
  }

  return (
    <StyledWrapper>
      <a id="google-login" className="login-button" href={GOOGLE_AUTH_URL}>
        <img className="login-image" src="/images/login/google_login.png"></img>
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
