import React from "react";
import { styled } from "styled-components";
import { usePostContext } from "../../../../context/PostContext";

const StyleQuestionInfo = styled.div`
  display: flex;
  font-size: 13px;
  margin-bottom: 16px;

  > div {
    margin-right: 16px;
  }
`;

export default function QuestionInfo() {
  const { post } = usePostContext();

  return (
    <StyleQuestionInfo>
      <div>Asked: {post ? post.posts[0].created_at : "Loading..."}</div>
      <div>Modified: {post ? post.posts[0].updated_at : "Loading..."}</div>
      <div>Viewed:{post ? post.posts[0].question_viewcount : "Loading..."}</div>
    </StyleQuestionInfo>
  );
}
