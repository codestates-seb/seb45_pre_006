import React from "react";
import { styled } from "styled-components";
import AnswerHeader from "./header/AnswerHeader";
import AnswerMain from "./main/AnswerMain";
import AnswerEditor from "./main/AnswerEditor";

const StyleAnswerContainer = styled.div`
  padding: 0px 16px;
`;

export default function AnswerContainer({ postData }) {
  return (
    <StyleAnswerContainer>
      <AnswerHeader postData={postData}></AnswerHeader>
      <AnswerMain postData={postData}></AnswerMain>
      <AnswerEditor postData={postData}></AnswerEditor>
    </StyleAnswerContainer>
  );
}
