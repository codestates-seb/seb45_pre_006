import React from "react";
import { styled } from "styled-components";
import About from "./About";
import Posts from "./Posts";

const StyleUserProfile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  h4 {
    font-size: 21px;
    font-weight: bold;
  }
`;

export default function UserProfile({ user }) {
  return (
    <StyleUserProfile>
      <About user={user} />
      <Posts user={user} />
    </StyleUserProfile>
  );
}
