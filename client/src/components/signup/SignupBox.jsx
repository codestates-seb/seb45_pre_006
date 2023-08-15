import React from "react";
import { styled } from "styled-components";
import SiteSignup from "./SiteSignup";
import GoogleSignup from "./GoogleSignup";
import { Link } from "react-router-dom";
const StyleSignup = styled.div`
  width: 316px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  .already-account {
    font-size: 14px;
  }
`;
export default function SignupBox() {
  return (
    <StyleSignup>
      <GoogleSignup />
      <SiteSignup />
      <span className="already-account">
        Already have an account? <Link to="/login">Log in</Link>
      </span>
    </StyleSignup>
  );
}
