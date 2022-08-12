import axios from "axios";

const accessToken = localStorage.getItem("accessToken");
const Axios = axios.create({
  baseURL: `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_URL}`,
  timeout: 1000,
  headers: { Authorization: `Bearer ${accessToken}` },
});

export default Axios;
