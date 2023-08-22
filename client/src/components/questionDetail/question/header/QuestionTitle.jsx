import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "styled-components";
import AskQuestion from "./AskQuestion";
import { usePostContext } from "../../../../context/PostContext";
import useAxiosData from "../../../../hooks/useAxiosData";
import { useDataContext } from "../../../../context/DataContext";

const StyleQuestionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  .title {
    font-size: 27px;
  }
`;

export default function QuestionTitle({ postData }) {
  return (
    <StyleQuestionTitle>
      <h2 className="title">{postData.question_title}</h2>
      <AskQuestion></AskQuestion>
    </StyleQuestionTitle>
  );
}
