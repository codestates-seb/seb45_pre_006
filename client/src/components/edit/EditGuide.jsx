import React from "react";
import { styled } from "styled-components";

const StyleEditGuide = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #dfd4ae;
  border-radius: 3px;
  margin: 16px 0 0 16px;
  width: 380px;
  font-size: 15px;

  background-color: #fdf7e2;
  .title {
    padding: 13px 10px;
    margin-bottom: 3px;
    border-bottom: 1px solid #dfd4ae;
    background-color: #fbf3d5;
  }
  .content {
    font-size: 12px;
    line-height: 17px;
    padding: 0 10px;
    letter-spacing: 0.15px;
    ul {
      list-style-type: disc;
      margin-left: 25px;
      li {
        margin-top: 8px;
      }
    }
  }
`;
export default function EditGuide() {
  return (
    <StyleEditGuide>
      <div className="title">How to Edit</div>
      <div className="content">
        <ul>
          <li>Correct minor typos or mistakes</li>
          <li>Clarify meaning without changing it</li>
          <li>Add related resources or links</li>
          <li>Always respect the author’s intent</li>
          <li>Don’t use edits to reply to the author</li>
        </ul>
      </div>
    </StyleEditGuide>
  );
}
