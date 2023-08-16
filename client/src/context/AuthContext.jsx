import React from "react";
import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const localUser = localStorage.getItem("user");
  const [user, setUser] = useState(localUser);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    axios.post("/logout"); // 로그아웃
  };

  const removeUser = () => {
    logout();
    axios.post("/remove"); // 회원 탈퇴
  };

  const userHandler = (user) => {
    setUser(user);
  };

  useEffect(() => {
    axios.post("/user/login-check").catch(() => {});
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
