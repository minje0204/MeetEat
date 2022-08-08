import axios from "axios";
import { useParams } from "react-router-dom";
export default function Login() {
  let params = new URL(document.location).searchParams;
  let code = params.get("code");
  const provider = useParams().provider;
  console.log(provider);
  console.log(code);
  if (code != null) {
    axios
      .get("url", `{provider: ${provider}, code: ${code}}`)
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
