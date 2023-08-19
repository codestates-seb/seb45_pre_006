import React from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import getTimeAgoText from "../../utils/getTimeAgoText";

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
    padding: 0 18px;
    line-height: 30px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: bold;
    &.active {
      color: var(--white);
      border-color: transparent;
      background-color: #5fba7c;
    }
  }
  .title {
    padding-top: 3px;
    flex: 1;
  }
  .timestamp {
    font-size: 14px;
    font-weight: bold;
    color: var(--black-400);
  }
`;

export default function PostItem({ question }) {
  const { question_id, question_title, question_createdAt, question_answerCount } = question;
  return (
    <StylePostItem>
      <div className={`count ${question_answerCount ? "active" : ""}`}>{question_answerCount}</div>
      <Link className="title" to={`/questions/${question_id}`}>
        {question_title}
      </Link>
      <span className="timestamp">{getTimeAgoText(question_createdAt)}</span>
    </StylePostItem>
  );
}
