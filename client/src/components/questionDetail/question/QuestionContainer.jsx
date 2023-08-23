import React from "react";
import QuestionHeader from "./header/QuestionHeader";
import QuestionMain from "./main/QuestionMain";
import { styled } from "styled-components";

const StyleQuestionContainer = styled.div`
  padding: 40px 16px;
`;

export default function QuestionContainer({ postData, setPostData, userData }) {
  return (
    <StyleQuestionContainer>
      <QuestionHeader postData={postData} />
      <QuestionMain
        postData={postData}
        setPostData={setPostData}
        userData={userData}
      />
    </StyleQuestionContainer>
  );
}
