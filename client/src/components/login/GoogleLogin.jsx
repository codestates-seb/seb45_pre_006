import React from "react";
import { GoogleButton } from "../common/Button";

export default function GoogleLogin() {
  const googleLoginHandler = () => {
    // google Auth2 작업 실행
  };
  return <GoogleButton onClick={googleLoginHandler}>Log in with Google</GoogleButton>;
}
