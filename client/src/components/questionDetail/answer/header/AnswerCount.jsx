import React from "react";
import { styled } from "styled-components";
import { usePostContext } from "../../../../context/PostContext";

const StyleAnswerCount = styled.div`
  font-size: 19px;
`;

export default function AnswerCount() {
  const { post } = usePostContext();

  if (!post || !post.posts) {
    return <div>Loading...</div>;
  }

  const answerData = post.posts[0].Answer;

  return <StyleAnswerCount>{answerData.length} Answer</StyleAnswerCount>;
}
