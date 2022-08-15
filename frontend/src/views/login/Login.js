import Axios from "utils/axios/Axios";
// import { useDispatch } from "react-redux";
// import { SetUserInfo } from "modules/user";
import { useParams } from "react-router-dom";

export default function Login() {
  let params = new URL(document.location).searchParams;
  const code = params.get("code");
  const provider = useParams().provider;
  const redirect_uri = `http://localhost:3000/login/${provider}`;
  console.log(code);
  // const dispatch = useDispatch();
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
          window.location.href = `http://localhost:3000/signup?code=${code}&redirect_uri=${redirect_uri}&email=${res.data.response.email}&provider=${provider}`;
        } else if (res.data.response.id) {
          console.log(res);
          localStorage.setItem("accessToken", res.data.response.accessToken);
          Axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.response.accessToken}`;
          // window.sessionStorage.setItem("user", {
          //   nickname: res.data.response.nickname,
          //   email: res.data.response.email,
          //   bio: res.data.response.bio,
          //   profile: res.data.response.profile,
          // });
          window.sessionStorage.setItem("logged", true);
          window.sessionStorage.setItem("nickname", res.data.response.nickname);
          window.sessionStorage.setItem("email", res.data.response.email);
          window.sessionStorage.setItem("bio", res.data.response.bio);
          window.sessionStorage.setItem("profile", res.data.response.profile);
          window.sessionStorage.setItem(
            "accessToken",
            res.data.response.accessToken,
          );
          // const data = {
          //   nickname: res.data.response.nickname,
          //   email: res.data.response.email,
          //   bio: res.data.response.bio,
          //   profile: res.data.response.profile,
          //   accessToken: res.data.response.accessToken,
          // };
          // dispatch(SetUserInfo(data));
          // window.location.href = `http://localhost:3000`;
        }
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    alert("로그인 에러!");
  }
}
