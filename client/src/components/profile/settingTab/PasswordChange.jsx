import React from "react";
import useForm from "../../../hooks/useForm";
import useError from "../../../hooks/useError";
import ErrorInput from "../../common/ErrorInput";
import { styled } from "styled-components";
import { BlueButton, PowderButton } from "../../common/Button";
import { useNavigate } from "react-router-dom";
import api from "../../utils/send";
const StylePasswordChange = styled.div`
  p {
    padding-bottom: 16px;
    font-weight: bold;
    font-size: 13px;
    max-width: 300px;
    line-height: normal;
    color: var(--black-400);
  }
  .buttons {
    margin-top: 0;
  }
`;

export default function PasswordChange({ userProfile }) {
  const { email, userId } = userProfile;
  const [passwordForm, setPasswordForm] = useForm({
    currentPassword: "",
    newPassword: "",
    passwordCheck: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useError({ currentPassword: "", password: "", passwordCheck: "" });
  const passChangeValidation = () => {
    const errors = {
      currentPassword: "",
      newPassword: "",
      passwordCheck: "",
    };
    if (passwordForm.currentPassword === passwordForm.newPassword) {
      errors.newPassword = "same current password and the new password";
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(passwordForm.newPassword)) {
      errors.newPassword = `${passwordForm.newPassword} is not a valid password address`;
    }
    if (passwordForm.newPassword.trim().length < 1) {
      errors.newPassword = "password cannot be empty";
    }
    if (passwordForm.newPassword.trim().length > 14) {
      errors.newPassword = "Length must be 15 characters or less";
    }

    if (passwordForm.newPassword !== passwordForm.passwordCheck) {
      errors.passwordCheck = "Password revalidation does not match";
    }
    setError(errors);
    return Object.values(errors).every((error) => error === "");
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (passChangeValidation()) {
      try {
        const { currentPassword, newPassword } = passwordForm;
        await api.patch(`/user/password/${userId}`, { currentPassword, newPassword });
        alert('비밀번호 변경이 완료되었습니다')
        navigate(`/users/${userId}`);
      } catch (e) {
      }
    }
  };

  return (
    <StylePasswordChange>
      <h4>Change password</h4>
      <p>Change password for {email}</p>
      <form onSubmit={onSubmitHandler}>
        <ErrorInput
          label="Current password"
          name="currentPassword"
          type="password"
          value={passwordForm.currentPassword}
          onChange={setPasswordForm}
          error={error.currentPassword}
        />
        <ErrorInput
          label="New password"
          name="newPassword"
          type="password"
          value={passwordForm.newPassword}
          onChange={setPasswordForm}
          error={error.newPassword}
        />
        <ErrorInput
          label="New password (again)"
          name="passwordCheck"
          type="password"
          value={passwordForm.passwordCheck}
          onChange={setPasswordForm}
          error={error.passwordCheck}
        />
        <p>
          Passwords must contain at least eight characters, including at least 1 letter and 1
          number.
        </p>
        <div className="buttons">
          <BlueButton type="submit" onSubmit={onSubmitHandler}>
            Save profile
          </BlueButton>
          <PowderButton onClick={() => navigate(`/users/${userId}`)}>Cancel</PowderButton>
        </div>
      </form>
    </StylePasswordChange>
  );
}
