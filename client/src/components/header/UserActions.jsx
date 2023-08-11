import React from "react";
import { styled } from "styled-components";
import LoginActions from "./actions/LoginActions";
import UnLoginActions from "./actions/UnLoginActions";

const StyleUserActions = styled.div`
  display: flex;
  width: 135px;
  justify-content: space-between;
`;
export default function UserActions() {
  const user = false;
  return <StyleUserActions>{user ? <LoginActions /> : <UnLoginActions />}</StyleUserActions>;
}
