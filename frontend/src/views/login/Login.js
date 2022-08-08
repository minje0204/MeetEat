import axios from "axios";
export default function Login() {
  let params = new URL(document.location).searchParams;
  let code = params.get("code");
  console.log(code);
  if (code != null) {
    axios.get("url", `{code: ${code}}`).then(res => {
      if (res.data) {
        console.log(res.data);
      }
    });
  }
}
