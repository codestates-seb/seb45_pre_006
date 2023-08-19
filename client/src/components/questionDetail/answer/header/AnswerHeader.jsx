import React from "react";
import { styled } from "styled-components";
import AnswerCount from "./AnswerCount";
import AnswerFilter from "./AnswerFilter";

const StyleAnswerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
`;

export default function AnswerHeader({ postData }) {
  return (
    <StyleAnswerHeader>
      <AnswerCount postData={postData}></AnswerCount>
      <AnswerFilter postData={postData}></AnswerFilter>
    </StyleAnswerHeader>
  );
}
