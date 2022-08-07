export const REST_API_KEY = "2a97016e9f66dff3fdad3046d1ee9a9b";
export const REDIRECT_URI = "http://localhost:3000/";

export default function KakaoLogin() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  function handleLogin() {
    window.location.href = KAKAO_AUTH_URL;
  }

  return <button onClick={handleLogin}>카카오로 로그인</button>;
}
