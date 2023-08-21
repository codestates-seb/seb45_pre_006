import axios from "axios";
//
const api = axios.create({
  baseURL: "http://13.125.37.74:8080/",
});

api.interceptors.request.use((config) => {
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  config.headers["RefreshToken"] = refreshToken;
  config.headers["Content-Type"] = "application/json";
  config.headers["ngrok-skip-browser-warning"] = "69420";
  config.withCredentials = true;
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  async (error) => {
    if (error.response.data.message === "Time Out") {
      window.dispatchEvent(new Event("logoutEvent"));
    }
  }
);

export default api;
