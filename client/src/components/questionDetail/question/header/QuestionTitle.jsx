import React from "react";
import { styled } from "styled-components";
import AskQuestion from "./AskQuestion";

const StyleQuestionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  .title {
    font-size: 27px;
  }
`;

export default function QuestionTitle({ postData }) {
  return (
    <StyleQuestionTitle>
      <h2 className="title">{postData.question_title}</h2>
      <AskQuestion></AskQuestion>
    </StyleQuestionTitle>
  );
}
