import styled from "styled-components";

export default function GoogleLogin() {
  const client_id = "add here";
  const redirectURI = encodeURI("http://localhost:3000/login-google");
  const state = encodeURI("http://localhost:3000/");
  const scope = "https://www.googleapis.com/auth/userinfo.email";
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirectURI}&response_type=code&state=${state}&scope=${scope}`;

  return (
    <StyledWrapper>
      <a id="google-login" className="login-button" href={GOOGLE_AUTH_URL}>
        <img
          className="login-image"
          src="/images/login/google_login.png"
          alt="google_logiin"
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
