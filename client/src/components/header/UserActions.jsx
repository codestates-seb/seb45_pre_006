import React from "react";
import { styled } from "styled-components";
import LoginActions from "./actions/LoginActions";
import UnLoginActions from "./actions/UnLoginActions";
import { useAuthContext } from "../../context/AuthContext";

const StyleUserActions = styled.div`
  display: flex;
  width: 135px;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  button {
    height: 33px;
  }
  .user-profile {
    width: 50px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
      background-color: var(--gray-hover);
    }
    img {
      height: 27px;
    }
  }
`;
export default function UserActions() {
  const { user } = useAuthContext();
  console.log(user);
  return <StyleUserActions>{user ? <LoginActions /> : <UnLoginActions />}</StyleUserActions>;
}
