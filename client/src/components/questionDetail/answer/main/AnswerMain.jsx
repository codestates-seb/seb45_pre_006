import React, { useEffect } from "react";
import { styled, keyframes } from "styled-components";
import AnswerVote from "./AnswerVote";
import AnswerContents from "./AnswerContents";
import { usePostContext } from "../../../../context/PostContext";
import AnswerComment from "./AnswerComment";
import { useLocation } from "react-router-dom";

const StyleAnswerMain = styled.div`
  .container {
    display: flex;
    flex-direction: column;
  }
  .Contentscontainer {
    padding: 16px 0;
    display: flex;
    border-top: 1px solid var(--border);
  }
`;

export default function AnswerMain() {
  const location = useLocation(); //

  useEffect(() => {
    //  URL로부터 쿼리파라미터를 읽음
    const queryParams = new URLSearchParams(location.search);
    const sectionId = queryParams.get("section");

    // section Id가 있는경우 해당구역으로 이동
    // 중요!: 임시로 answer_Id로 섹션을 나눠놈. 백앤하고 상의해봐야할듯
    if (sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  });

  // 질문 post 정보 받아오기
  const { post } = usePostContext();
  if (!post || !post.posts) {
    return <div>Loading...</div>;
  }
  const AnswerData = post.posts[0].Answer;

  return (
    <StyleAnswerMain>
      {AnswerData.map((answerItem) => (
        <div
          key={answerItem.answer_Id}
          id={answerItem.answer_Id}
          className="container"
        >
          <div className="Contentscontainer">
            <AnswerVote data={answerItem} />
            <AnswerContents data={answerItem} />
          </div>
          <AnswerComment data={answerItem} />
        </div>
      ))}
    </StyleAnswerMain>
  );
}
