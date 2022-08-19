import axios from "axios";

const accessToken = window.sessionStorage.getItem("accessToken");
const Axios = axios.create({
  baseURL: `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_URL}`,
  timeout: 3000,
  headers: { Authorization: `Bearer ${accessToken}` },
});

export default Axios;
