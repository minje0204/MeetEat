import axios from "axios";
import { useParams } from "react-router-dom";
export default function Login() {
  let params = new URL(document.location).searchParams;
  const code = params.get("code");
  const provider = useParams().provider;
  const redirect_uri = `http://localhost:3000/login/${provider}`;
  console.log(provider);
  console.log(code);
  if (code != null) {
    axios
      .get("url", {
        params: { provider: provider, code: code, redirect_uri: redirect_uri },
      })
      .then(res => {
        if (res.data) {
          console.log(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    alert("로그인 에러!");
  }
}
