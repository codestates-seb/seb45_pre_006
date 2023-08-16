import React from "react";
import useForm from "../../../hooks/useForm";
import useError from "../../../hooks/useError";
import ErrorInput from "../../common/ErrorInput";

export default function PasswordChange({ user }) {
  const { userId } = user;
  const [loginsForm, setLoginForm] = useForm({
    currentPassword: "",
    newPassword: "",
    passwordCheck: "",
  });
  const [error, setError] = useError({ currentPassword: "", password: "", passwordCheck: "" });
  return (
    <>
      <h4>Change password</h4>
      <p>Change password for {userId}</p>
      <form>
        <ErrorInput
          name="currentPassword"
          type="password"
          value={loginsForm.currentPassword}
          onChange={setLoginForm}
          error={error.currentPassword}
        />
        <ErrorInput
          name="newPassword"
          type="password"
          value={loginsForm.newPassword}
          onChange={setLoginForm}
          error={error.newPassword}
        />
        <ErrorInput
          name="passwordCheck"
          type="password"
          value={loginsForm.passwordCheck}
          onChange={setLoginForm}
          error={error.passwordCheck}
        />
      </form>
    </>
  );
}
