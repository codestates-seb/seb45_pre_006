import React from "react";
import { styled } from "styled-components";
import PasswordChange from "./PasswordChange";
const StyleLogins = styled.div``;

export default function Logins({ user }) {
  const { userId } = user;

  return (
    <StyleLogins>
      <PasswordChange user={user} />
    </StyleLogins>
  );
}
