import React from "react";
import { styled } from "styled-components";
import About from "./profileTab/About";
import Posts from "./profileTab/Posts";

const StyleUserProfile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  h4 {
    font-size: 21px;
    font-weight: bold;
  }
`;

export default function UserProfile({ userProfile }) {
  return (
    <StyleUserProfile>
      <About userProfile={userProfile} />
      <Posts userProfile={userProfile} />
    </StyleUserProfile>
  );
}
