import React from "react";
import { BlueButton, PowderButton } from "../../common/Button";
import { useNavigate } from "react-router-dom";

export default function UnLoginActions() {
  const navigate = useNavigate();

  return (
    <>
      <PowderButton onClick={() => navigate("/login")}>Log in</PowderButton>
      <BlueButton onClick={() => navigate("/signup")}>Sign up</BlueButton>
    </>
  );
}
