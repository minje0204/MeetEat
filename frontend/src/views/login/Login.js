import Axios from "utils/axios/Axios";
import { useDispatch } from "react-redux";
import { SetUserInfo } from "modules/user";
import { useParams } from "react-router-dom";

export default function Login() {
  let params = new URL(document.location).searchParams;
  const code = params.get("code");
  const provider = useParams().provider;
  const redirect_uri = `/login/${provider}`;

  const dispatch = useDispatch();

  if (code != null) {
    Axios.get(`/auth/login/${provider}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${code}`,
      },
      params: { code: code, redirect_uri: redirect_uri },
    })
      .then(res => {
        if (res.data.response.role === "ANONYMOUS") {
          window.location.href = `http://localhost:3000/signup?code=${code}&redirect_uri=${redirect_uri}&email=${res.data.response.email}`;
        } else {
          localStorage.setItem("accessToken", res.data.response.accessToken);
          Axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.response.accessToken}`;
          const data = {
            nickname: res.data.response.nickname,
            email: res.data.response.email,
            bio: res.data.response.bio,
            profile: res.data.response.profile,
            accessToken: res.data.response.accessToken,
          };
          dispatch(SetUserInfo(data));
          window.location.href = `http://localhost:3000`;
        }
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    alert("로그인 에러!");
  }
}
