import Axios from "utils/axios/Axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  let params = new URL(document.location).searchParams;
  const code = params.get("code");
  const provider = useParams().provider;
  const redirect_uri = `${process.env.REACT_APP_CLIENT_PROTOCOL}://${process.env.REACT_APP_CLIENT_URL}/login/${provider}`;
  console.log(code);
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
          navigate("/signup", {
            state: {
              email: res.data.response.email,
              code: code,
              provider: provider,
              redirect_uri: redirect_uri,
            },
          });
          // window.location.href = `${process.env.REACT_APP_CLIENT_PROTOCOL}://${process.env.REACT_APP_CLIENT_URL}/signup?code=${code}&redirect_uri=${redirect_uri}&email=${res.data.response.email}&provider=${provider}`;
        } else if (res.data.response.id) {
          console.log(res);
          localStorage.setItem("accessToken", res.data.response.accessToken);
          Axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.response.accessToken}`;
          window.sessionStorage.setItem("logged", true);
          window.sessionStorage.setItem("nickname", res.data.response.nickname);
          window.sessionStorage.setItem("email", res.data.response.email);
          window.sessionStorage.setItem("bio", res.data.response.bio);
          window.sessionStorage.setItem("profile", res.data.response.profile);
          window.sessionStorage.setItem(
            "accessToken",
            res.data.response.accessToken,
          );
          window.sessionStorage.setItem("id", res.data.response.id);
          window.location.href = `${process.env.REACT_APP_CLIENT_PROTOCOL}://${process.env.REACT_APP_CLIENT_URL}/`;
        }
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    toast.error("로그인 에러!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  }
}
