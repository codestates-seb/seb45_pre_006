import React from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { styled } from "styled-components";

const StyleRemovebutton = styled.button`
  border: 1px solid #d0393e;
  padding: 10px;
  width: 100px;
  border-radius: 5px;
  margin-top: -20px;
  font-size: 13px;
  color: #d0393e;
  transition: all.2s;
  cursor: pointer;
  &:hover {
    background-color: #d0393e;
    color: var(--white);
  }
`;

export default function RemoveUser({ userProfile }) {
  const { removeUser } = useAuthContext();

  return (
    <>
      <h4>Remove user</h4>
      <StyleRemovebutton onClick={removeUser}>Remove</StyleRemovebutton>
    </>
  );
}
