import React from "react";
import { styled } from "styled-components";
import { BlueButton } from "../common/Button";
import ErrorInput from "../common/ErrorInput";
import useError from "../../hooks/useError";
import useForm from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import network from "../utils/network";
const StyleSiteSignup = styled.form`
  background: var(--white);
  height: 425px;
  box-shadow: 0 0 5px 2px var(--shadow);
  padding: 24px;
  border-radius: 5px;
  flex: 1;
  input {
    font-size: 13px;
    height: 33px;
    padding: 6px 8px;
  }
  #password {
    letter-spacing: 3px;
  }
  p {
    font-weight: bold;
    font-size: 12.5px;
    color: var(--black-400);
    line-height: 1.1;
    &:last-child {
      margin-top: 20px;
    }
  }
  button {
    margin-top: 10px;
    font-weight: bold;
  }
`;

export default function SiteSignup() {
  const [signupForm, setSignupForm, clearSignupForm] = useForm({
    displayName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useError({ displayName: "", email: "", password: "" });
  const navigate = useNavigate();

  const signupValidation = () => {
    const errors = {
      displayName: "",
      email: "",
      password: "",
    };
    if (signupForm.displayName.length < 2) {
      errors.displayName = "displayName must be at least 2 characters";
    }
    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/i.test(signupForm.email)) {
      errors.email = `${signupForm.email} is not a valid email address`;
    }
    if (signupForm.email.trim().length < 1) {
      errors.email = "email cannot be empty";
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(signupForm.password)) {
      errors.password = `${signupForm.password} is not a valid password address`;
    }
    if (signupForm.password.trim().length < 1) {
      errors.password = "password cannot be empty";
    }
    if (signupForm.password.trim().length > 14) {
      errors.password = "Length must be 15 characters or less";
    }
    setError(errors);
    return Object.values(errors).every((error) => error === "");
  };

  const handleSignupSuccess = () => {
    navigate("/login");
    clearSignupForm();
  };
  const handleExistsError = () => {
    setError({ ...error, email: "email already exists" });
    setSignupForm(null, "email", "");
  };

  const siteSignupHandler = async (e) => {
    e.preventDefault();
    if (signupValidation()) {
      const { displayName, email, password } = signupForm;
      try {
        network("post", "/user/post", { displayName, email, password });
        handleSignupSuccess();
      } catch (e) {
        handleExistsError();
      }
    }
  };

  return (
    <StyleSiteSignup onSubmit={siteSignupHandler}>
      <ErrorInput
        label="Display name"
        type="text"
        name="displayName"
        value={signupForm.displayName}
        onChange={setSignupForm}
        error={error.displayName}
      />
      <ErrorInput
        label="Email"
        type="id"
        name="email"
        value={signupForm.email}
        onChange={setSignupForm}
        error={error.email}
      />
      <ErrorInput
        label="Password"
        type="password"
        name="password"
        value={signupForm.password}
        onChange={setSignupForm}
        error={error.password}
        autocomplete="current-password"
      />
      <p>
        Passwords must contain at least eight characters, including at least 1 letter and 1 number.
      </p>
      <BlueButton $width="100%" $padding="10px">
        Sign up
      </BlueButton>
      <p>
        By clicking “Sign up”, you agree to our terms of service and acknowledge that you have read
        and understand our privacy policy and code of conduct.
      </p>
    </StyleSiteSignup>
  );
}
