import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import QuestionContainer from "../components/questionDetail/question/QuestionContainer";
import AnswerContainer from "../components/questionDetail/answer/AnswerContainer";
import { PostProvider } from "../context/PostContext";
import useAxiosData from "../hooks/useAxiosData";
import { useParams } from "react-router-dom";

const StyleQuestionDetail = styled.div``;

export default function QuestionDetail() {
  // 데이터 받아서 저장하는 코드
  const [postData, setPostData] = useState();
  const axiosData = useAxiosData();

  // question_id 파라미터 받아서 axios 통신하기
  const { question_id } = useParams();

  useEffect(() => {
    const requestBody = null;
    axiosData("get", `questions/${question_id}`, requestBody)
      .then((responseData) => {
        setPostData(responseData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <PostProvider>
      <StyleQuestionDetail>
        <QuestionContainer postData={postData} />
        <AnswerContainer postData={postData} />
      </StyleQuestionDetail>
    </PostProvider>
  );
}
