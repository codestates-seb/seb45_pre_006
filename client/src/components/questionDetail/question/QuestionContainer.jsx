import React from "react";
import QuestionHeader from "./header/QuestionHeader";
import QuestionMain from "./main/QuestionMain";
import { styled } from "styled-components";

const StyleQuestionContainer = styled.div`
  padding: 40px 16px;
`;

export default function QuestionContainer({ postData }) {
  return (
    <StyleQuestionContainer>
      <QuestionHeader postData={postData}></QuestionHeader>
      <QuestionMain postData={postData}></QuestionMain>
    </StyleQuestionContainer>
  );
}
