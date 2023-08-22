import React from "react";
import { styled } from "styled-components";
import QuestionTitle from "./QuestionTitle";
import QuestionInfo from "./QuestionInfo";

const StyleQuestionHeader = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--border);
  margin-bottom: 16px;
`;

export default function QuestionHeader({ postData }) {
  return (
    <StyleQuestionHeader>
      <QuestionTitle postData={postData} />
      <QuestionInfo postData={postData} />
    </StyleQuestionHeader>
  );
}
