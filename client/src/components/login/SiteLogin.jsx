import React from "react";
import { styled } from "styled-components";
import ErrorInput from "../common/ErrorInput";
import useForm from "../../hooks/useForm";
import useError from "../../hooks/useError";
import { BlueButton } from "../common/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";
const StyleSiteLogin = styled.form`
  width: 288px;
  height: 234px;
  background-color: var(--white);
  border-radius: 5px;
  box-shadow: 0 0 5px 2px var(--shadow);
  padding: 24px;
  position: relative;
  input {
    font-size: 13px;
    height: 33px;
    padding: 6px 8px;
  }
  #password {
    letter-spacing: 3px;
  }
  button {
    font-weight: bold;
    margin-top: 5px;
  }
  a {
    position: absolute;
    top: 100px;
    right: 24px;
    font-size: 12px;
  }
`;
export default function SiteLogin() {
  const [signinForm, setSigninForm, clearLoginForm] = useForm({ email: "", password: "" });
  const [error, setError] = useError({ email: "", password: "" });
  const nav = useNavigate();
  const { userHandler } = useAuthContext();
  const loginValidation = () => {
    const errors = {
      email: "",
      password: "",
    };
    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/i.test(signinForm.email)) {
      errors.email = `${signinForm.email} is not a valid email address`;
    }
    if (signinForm.email.trim().length < 1) {
      errors.email = "email cannot be empty";
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(signinForm.password)) {
      errors.password = `${signinForm.password} is not a valid password address`;
    }
    if (signinForm.password.trim().length < 1) {
      errors.password = "password cannot be empty";
    }
    if (signinForm.password.trim().length > 14) {
      errors.password = "Length must be 15 characters or less";
    }
    setError(errors);
    return Object.values(errors).every((error) => error === "");
  };

  const siteLoginHandler = async (e) => {
    e.preventDefault();
    if (loginValidation()) {
      try {
        const res = await axios.post("/user/login", {
          email: signinForm.email,
          password: signinForm.password,
        });
        const { userid: userId, img, displayname: displayName } = res.headers;
        userHandler({ userId, img, displayName });
        localStorage.setItem("user", { userId, img, displayName });
        nav("/");
      } catch (e) {
        // 로그인 에러처리
      }
      clearLoginForm();
    }
  };

  return (
    <StyleSiteLogin onSubmit={siteLoginHandler}>
      <ErrorInput
        label="Email"
        type="id"
        name="email"
        value={signinForm.email}
        onChange={setSigninForm}
        error={error.email}
      />
      <ErrorInput
        label="Password"
        type="password"
        name="password"
        value={signinForm.password}
        onChange={setSigninForm}
        error={error.password}
        autoComplete="new-password"
        maxLength={15}
      />
      <Link to="/reset-password">Forgot password?</Link>
      <BlueButton $width="100%" $padding="10px">
        Log In
      </BlueButton>
    </StyleSiteLogin>
  );
}
