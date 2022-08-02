import styled from "styled-components";
export default function ModalContent(props) {
  return (
    <StyledWrapper>
      <i
        id="close-button"
        class="fa-solid fa-x"
        onClick={props.handleClose}
      ></i>
      <div className="social-login-container">
        <h1> 밋잇</h1>
        <h1> 로고이미지</h1>
        <hr></hr>
        <span>간편 로그인</span>
      </div>
      <div className="container">
        <a id="google-login" className="login-button" href="#">
          <img
            className="login-image"
            src="/images/login/google_login.png"
          ></img>
        </a>
        <a id="naver-login" className="login-button" href="#">
          <img
            className="login-image"
            src="/images/login/naver_login.png"
          ></img>
        </a>
        <a id="kakao-login" className="login-button" href="#">
          <img
            className="login-image"
            src="/images/login/kakao_login.png"
          ></img>
        </a>
      </div>
    </StyledWrapper>
  );
}
const StyledWrapper = styled.div`
  .social-login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h1 {
    text-align: center;
  }
  span {
    padding: 0 8px;
    margin-bottom: 16px;
    font-size: 11px;
    line-height: 16px;
    letter-spacing: -0.3px;
    color: #abb0b5;
    z-index: 11;
    background-color: #ffffff;
  }
  hr {
    position: relative;
    bottom: -8px;
    display: block;
    margin: 0;
    width: 100%;
    height: 1px;
    background-color: #f1f3f5;
    border: none;
  }
  * {
    font-family: sans-serif;
  }
  #close-button {
    position: absolute;
    right: 5%;
    top: 5%;
  }
  #close-button:hover {
    cursor: pointer;
  }
  .login-button {
    width: 75%;
    margin: 2px auto;
    text-align: center;
  }
  .login-image {
    width: 100%;
  }
  .container {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    flex-flow: column;
  }
`;
