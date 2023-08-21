import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import QuestionContainer from "../components/questionDetail/question/QuestionContainer";
import AnswerContainer from "../components/questionDetail/answer/AnswerContainer";
import useAxiosData from "../hooks/useAxiosData";
import { useParams } from "react-router-dom";
import Loading from "../components/common/Loading";
import { useAuthContext } from "../context/AuthContext";

const StyleQuestionDetail = styled.div`
  width: 100%;
`;

export default function QuestionDetail() {
  // 데이터 받아서 저장하는 코드
  const [postData, setPostData] = useState();
  const axiosData = useAxiosData();

  // question_id 파라미터 받아서 axios 통신하기
  const { question_id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const requestBody = null;
        const responseData = await axiosData(
          "get",
          `questions/${question_id}`,
          requestBody
        );
        setPostData(responseData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // 여기에 로딩처리 한번에하기
  if (!postData) {
    return <Loading />;
  }

  return (
    <StyleQuestionDetail>
      <QuestionContainer postData={postData} />
      <AnswerContainer postData={postData} />
    </StyleQuestionDetail>
  );
}
