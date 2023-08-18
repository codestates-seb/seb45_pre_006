import React from "react";
import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(localUser);
  const logout = async () => {
    try {
      await axios.post("/user/logout");
      setUser(null);
      localStorage.removeItem("user");
      return true;
    } catch (e) {
      return false;
    }
  };
  const removeUser = async () => {
    try {
      await axios.delete(`/user/${user.userId}`).then((res) => console.log(res));
      setUser(null);
      localStorage.removeItem("user");
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
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
