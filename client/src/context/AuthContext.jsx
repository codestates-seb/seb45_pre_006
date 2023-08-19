import React from "react";
import { createContext, useContext, useState } from "react";
import api from "../components/utils/send";
const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(localUser);
  const logout = async () => {
    await api.post("/user/logout");
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
    return true;
  };

  const removeUser = async () => {
    await api.delete(`/user/${user.userId}`);
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
    return true;
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
