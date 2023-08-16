import React from "react";
import { styled } from "styled-components";
import QuestionContainer from "../components/questionDetail/question/QuestionContainer";
import AnswerContainer from "../components/questionDetail/answer/AnswerContainer";
import { PostProvider } from "../context/PostContext";

const StyleQuestionDetail = styled.div`
  width: 100%;
`;

export default function QuestionDetail() {
  return (
    <PostProvider>
      <StyleQuestionDetail>
        <QuestionContainer />
        <AnswerContainer />
      </StyleQuestionDetail>
    </PostProvider>
  );
}
