import React from "react";
import { PowderButton } from "../../common/Button";
import { useNavigate } from "react-router-dom";

export default function LoginActions() {
  const nav = useNavigate();
  return (
    <>
      <div className="user-profile" onClick={() => nav("/users/123123123")}>
        <img src="/images/userImg.png" alt="userProfile img" />
      </div>
      <PowderButton $width="80px">Log out</PowderButton>
    </>
  );
}
