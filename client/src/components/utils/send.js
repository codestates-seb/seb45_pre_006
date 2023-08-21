import axios from "axios";

const api = axios.create();

api.interceptors.request.use((config) => {
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  config.headers["RefreshToken"] = refreshToken;
  config.headers["Content-Type"] = "application/json";
  config.headers["ngrok-skip-browser-warning"] = "69420";
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.data.message === "Time Out") {
      window.dispatchEvent(new Event("logoutEvent"));
    }
  }
);

export default api;
