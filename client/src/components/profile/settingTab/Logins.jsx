import React from "react";
import { styled } from "styled-components";
import PasswordChange from "./PasswordChange";
const StyleLogins = styled.div``;

export default function Logins({ userProfile }) {
  const { userId } = userProfile;

  return (
    <StyleLogins>
      <PasswordChange userProfile={userProfile} />
    </StyleLogins>
  );
}
