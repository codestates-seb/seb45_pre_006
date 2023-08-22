import React from "react";
import { styled } from "styled-components";
import SubLogo from "../components/common/SubLogo";
import { Link } from "react-router-dom";
import SiteLogin from "../components/login/SiteLogin";
const StyleLogin = styled.section`
  width: 288px;
  height: 420px;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  .dont-have-account {
    font-size: 14px;
    margin-top: 20px;
  }
`;
export default function Login() {
  return (
    <StyleLogin>
      <SubLogo />
      <SiteLogin />
      <span className="dont-have-account">
        Don’t have an account? <Link to="/signup">Sign up</Link>
      </span>
    </StyleLogin>
  );
}
