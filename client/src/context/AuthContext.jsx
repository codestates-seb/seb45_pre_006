import { createContext, useContext, useState } from "react";
import network from "../components/utils/network";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(localUser);
  const navigate = useNavigate();

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  const logout = async () => {
    network("post", "/user/logout");
    clearUser();
  };

  const removeUser = async () => {
    network("delete", `/user/${user.userId}`);
    clearUser();
  };

  const userHandler = (user) => {
    setUser(user);
  };

  useEffect(() => {
    const handleTriggerLogout = () => {
      alert("토큰이 만료되었습니다 다시 로그인해주세요.");
      logout();
    };
    window.addEventListener("logoutEvent", handleTriggerLogout);
    return () => {
      window.removeEventListener("logoutEvent", handleTriggerLogout);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, userHandler, logout, removeUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
