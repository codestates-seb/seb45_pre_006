import axios from "axios";
import { cloneElement } from "react";
const api = axios.create();
// { baseURL: "http://13.125.37.74:8080/" }
api.interceptors.request.use((config) => {
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  config.headers["RefreshToken"] = refreshToken;
  config.headers["AccessToken"] = accessToken;
  config.headers["Content-Type"] = "application/json";
  config.headers["ngrok-skip-browser-warning"] = "69420";
  config.withCredentials = true;
  return config;
});

api.interceptors.response.use(
  function (res) {
    if (res.headers.accesstoken) {
      const accessToken = JSON.stringify(res.headers.accesstoken);
      localStorage.setItem("accessToken", accessToken);
    }
    if (res.headers.refreshtoken) {
      const refreshToken = JSON.stringify(res.headers.refreshtoken);
      localStorage.setItem("refreshToken", refreshToken);
    }
    console.log("res", res);
    return res; // 이 부분을 수정하여 정상적인 처리를 반환합니다.
  },
  function (err) {
    console.log("err", err);
    if (err.response.data.message === "Time Out") {
      window.dispatchEvent(new Event("logoutEvent"));
      return;
    }
    return Promise.reject(err);
  }
);

export default api;
