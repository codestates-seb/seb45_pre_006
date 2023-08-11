import React from "react";
import { BlueButton, PowderButton } from "../../common/Button";
import { useNavigate } from "react-router-dom";

export default function UnLoginActions() {
  const nav = useNavigate();

  return (
    <>
      <PowderButton $height="33px" onClick={() => nav("/login")}>
        Log in
      </PowderButton>
      <BlueButton $height="33px" onClick={() => nav("/login")}>
        Sign up
      </BlueButton>
    </>
  );
}
