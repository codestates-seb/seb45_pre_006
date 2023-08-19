import React from "react";
import { styled } from "styled-components";
import Vote from "./Vote";
import Contents from "./Contents";
import QuestionComment from "./QuestionComment";

const StyleQuestionMain = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--border);
`;

export default function QuestionMain({ postData }) {
  return (
    <StyleQuestionMain>
      <Contents postData={postData}> </Contents>
      <QuestionComment postData={postData}></QuestionComment>
    </StyleQuestionMain>
  );
}
