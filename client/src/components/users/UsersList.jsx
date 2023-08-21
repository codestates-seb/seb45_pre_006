import React from "react";
import UserItem from "./UserItem";
import { styled } from "styled-components";

const StyleUserList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
  gap: 20px;
`;

export default function UserList({ userList }) {
  return (
    <StyleUserList>
      {userList.map((user) => (
        <UserItem key={user.userId} user={user} />
      ))}
    </StyleUserList>
  );
}