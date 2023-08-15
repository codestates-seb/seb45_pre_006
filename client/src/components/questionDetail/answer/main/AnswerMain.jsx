import React from "react";
import { styled } from "styled-components";
import AnswerVote from "./AnswerVote";
import AnswerContents from "./AnswerContents";
import { usePostContext } from "../../../../context/PostContext";

const StyleAnswerMain = styled.div`
  display: flex;
  flex-direction: column;

  .container {
    padding: 16px 0;
    display: flex;
    border-top: 1px solid var(--border);
  }
`;

export default function AnswerMain() {
  // 질문 post 정보 받아오기
  const { post } = usePostContext();
  if (!post || !post.posts) {
    return <div>Loading...</div>;
  }
  const AnswerData = post.posts[0].Answer;

  return (
    <StyleAnswerMain>
      {AnswerData.map((answerItem) => (
        <div className="container" key={answerItem.id}>
          <AnswerVote data={answerItem} />
          <AnswerContents data={answerItem} />
        </div>
      ))}
    </StyleAnswerMain>
  );
}
