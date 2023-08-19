import React from "react";
import { styled } from "styled-components";
import { usePostContext } from "../../../../context/PostContext";
import getTimeAgoText from "../../../utils/getTimeAgoText";

const StyleQuestionInfo = styled.div`
  display: flex;
  font-size: 13px;
  margin-bottom: 16px;

  > div {
    margin-right: 16px;
  }
`;

export default function QuestionInfo() {
  // 질문 post 정보 받아오기
  const { post } = usePostContext();
  if (!post || !post.posts) {
    return <div>Loading...</div>;
  }

  return (
    <StyleQuestionInfo>
      <div>Asked: {getTimeAgoText(post.posts[0].created_at)}</div>
      <div>Modified: {getTimeAgoText(post.posts[0].updated_at)}</div>
      <div>Viewed:{post.posts[0].question_viewcount}</div>
    </StyleQuestionInfo>
  );
}
