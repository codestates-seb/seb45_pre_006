import React from "react";
import { styled } from "styled-components";
import AnswerHeader from "./header/AnswerHeader";
import AnswerMain from "./main/AnswerMain";
import AnswerEditor from "./main/AnswerEditor";

const StyleAnswerContainer = styled.div`
  padding: 0px 16px;
`;

export default function AnswerContainer() {
  return (
    <StyleAnswerContainer>
      <AnswerHeader></AnswerHeader>
      <AnswerMain></AnswerMain>
      <AnswerEditor></AnswerEditor>
    </StyleAnswerContainer>
  );
}
