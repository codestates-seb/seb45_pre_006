import React from "react";
import { PowderButton } from "../../common/Button";
import { useNavigate } from "react-router-dom";
export default function LoginActions() {
  const nav = useNavigate();
  return (
    <>
      <PowderButton>Log out</PowderButton>
    </>
  );
}
