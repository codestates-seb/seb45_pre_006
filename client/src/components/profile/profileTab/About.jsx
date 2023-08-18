import React from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
const StyleAbout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .write-about {
    width: 100%;
    height: 140px;
    background: var(--app-back-color);
    border-radius: 5px;
    border: 1px solid var(--border);
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: var(--black-400);
    span {
      line-height: normal;
      font-size: 15px;
      text-align: center;
    }
  }
`;

export default function About({ userProfile }) {
  const { isAdmin, aboutMe, userId } = userProfile;
  return (
    <StyleAbout $admin={isAdmin}>
      <h4>About</h4>
      {aboutMe && aboutMe}
      {isAdmin && !aboutMe && (
        <div className="write-about">
          <span>
            Your about me section is currently blank. Would you <br />
            like to add one? <Link to={`/users/${userId}/edit`}>Edit profile</Link>
          </span>
        </div>
      )}
    </StyleAbout>
  );
}
