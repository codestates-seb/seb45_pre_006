import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "styled-components";
import AskQuestion from "./AskQuestion";
import { usePostContext } from "../../../../context/PostContext";
import useAxiosData from "../../../../hooks/useAxiosData";
import { useDataContext } from "../../../../context/DataContext";
import Loading from "../../../common/Loading";

const StyleQuestionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  .title {
    font-size: 27px;
  }
`;

export default function QuestionTitle({ postData }) {
  if (!postData) {
    return <Loading></Loading>;
  }

  return (
    <StyleQuestionTitle>
      <div className="title">{postData.question_title}</div>
      <AskQuestion></AskQuestion>
    </StyleQuestionTitle>
  );
}
