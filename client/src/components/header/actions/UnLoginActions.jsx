import React from "react";
import { BlueButton, PowderButton } from "../../common/Button";
import { useNavigate } from "react-router-dom";

export default function UnLoginActions() {
  const nav = useNavigate();

  return (
    <>
      <PowderButton onClick={() => nav("/login")}>Log in</PowderButton>
      <BlueButton onClick={() => nav("/signup")}>Sign up</BlueButton>
    </>
  );
}
