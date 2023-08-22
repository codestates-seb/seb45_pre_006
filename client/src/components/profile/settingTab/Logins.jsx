import React from "react";
import { styled } from "styled-components";
import PasswordChange from "./PasswordChange";
import RemoveUser from "./RemoveUser";
const StyleLogins = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default function Logins({ userProfile }) {
  return (
    <StyleLogins>
      <PasswordChange userProfile={userProfile} />
      <RemoveUser />
    </StyleLogins>
  );
}
