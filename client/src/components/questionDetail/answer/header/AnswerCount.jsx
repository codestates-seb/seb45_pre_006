import React from "react";
import { styled } from "styled-components";
import Loading from "../../../common/Loading";

const StyleAnswerCount = styled.div`
  font-size: 19px;
`;

export default function AnswerCount({ postData }) {
  if (!postData) {
    return <Loading></Loading>;
  }

  const answerData = postData.answerList;

  return <StyleAnswerCount>{answerData.length} Answer</StyleAnswerCount>;
}
