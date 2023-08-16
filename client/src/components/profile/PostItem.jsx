import React from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import getTimeAgoText from "../common/getTimeAgoText";

const StylePostItem = styled.li`
  height: 60px;
  display: flex;
  padding: 20px;
  align-items: center;
  gap: 15px;
  &:not(:last-child) {
    border-bottom: 1px solid var(--border);
  }
  .count {
    border: 1px solid var(--border);
    width: 45px;
    height: 30px;
    display: flex;
    padding: 0 16.5px;
    line-height: 30px;
    border-radius: 5px;
    font-size: 14px;
    &.active {
      color: var(--white);
      border-color: transparent;
      background-color: #5fba7c;
    }
  }
  .title {
    flex: 1;
  }
  .timestamp {
    font-size: 13px;
    font-weight: bold;
    color: var(--black-400);
  }
`;
export default function PostItem({ question }) {
  const { question_id, title, created_at, question_answercount } = question;
  return (
    <StylePostItem>
      <div className={`count ${question_answercount ? "active" : ""}`}>
        {question_answercount}
      </div>
      <Link className="title" to={`/questions/${question_id}`}>
        {title}
      </Link>
      <span className="timestamp">{getTimeAgoText(created_at)}</span>
    </StylePostItem>
  );
}
