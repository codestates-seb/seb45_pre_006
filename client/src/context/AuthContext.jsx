import { createContext, useContext, useState } from "react";
import api from "../components/utils/send";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(localUser);
  const nav = useNavigate();
  
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
    nav("/");
  };

  const logout = async () => {
    await api.post("/user/logout");
    clearUser();
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

  const removeUser = async () => {
    await api.delete(`/user/${user.userId}`);
    clearUser();
  };

  const userHandler = (user) => {
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, userHandler, logout, removeUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
