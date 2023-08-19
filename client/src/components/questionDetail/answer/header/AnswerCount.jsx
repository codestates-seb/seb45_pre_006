import React from "react";
import { styled } from "styled-components";

const StyleAnswerCount = styled.div`
  font-size: 19px;
`;

export default function AnswerCount({ postData }) {
  if (!postData) {
    return <div>Loading...</div>;
  }

  const answerData = postData.answerList;

  return <StyleAnswerCount>{answerData.length} Answer</StyleAnswerCount>;
}
