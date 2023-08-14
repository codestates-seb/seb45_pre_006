import React from "react";
import { GoogleButton } from "../common/Button";

export default function GoogleSignup() {
  const googleSingnupHandler = () => {
    // google Auth2 작업 실행
  };
  return <GoogleButton onClick={googleSingnupHandler}>Sign up with Google</GoogleButton>;
}
