import React from "react";
import { PowderButton } from "../../common/Button";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";

export default function LoginActions() {
  const nav = useNavigate();
  const { user, logout } = useAuthContext();
  const { userId, img } = user;

  return (
    <>
      <div className="user-profile" onClick={() => nav(`/users/${userId}`)}>
        <img src={img || "/images/userImg.png"} alt="userProfile img" />
      </div>
      <PowderButton $width="80px" onClick={logout}>
        Log out
      </PowderButton>
    </>
  );
}
