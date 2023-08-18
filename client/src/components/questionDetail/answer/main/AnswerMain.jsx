import React, { useEffect, useState } from "react";
import { styled, keyframes } from "styled-components";
import AnswerVote from "./AnswerVote";
import AnswerContents from "./AnswerContents";
import { usePostContext } from "../../../../context/PostContext";
import AnswerComment from "./AnswerComment";
import { useLocation } from "react-router-dom";
import PaginationControls from "./PaginationControls";

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

export default function AnswerMain({ postData }) {
  const location = useLocation(); //

  // 페이지네이션을 위한 useState
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

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

  if (!postData) {
    return <div>Loading...</div>;
  }
  const AnswerData = postData.answerList;

  // 페이지네이션 구현
  const totalPages = Math.ceil(postData.answerList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <StyleAnswerMain>
      {console.log(AnswerData)}
      <PaginationControls
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      {AnswerData.slice(startIndex, endIndex).map((answerItem, idx) => (
        <div
          key={answerItem.answer_id}
          id={answerItem.answer_id}
          className="container"
        >
          <div className="Contentscontainer">
            <AnswerVote data={answerItem} />
            <AnswerContents data={answerItem} idx={idx} />
          </div>
          <AnswerComment data={answerItem} />
        </div>
      ))}
      <PaginationControls
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </StyleAnswerMain>
  );
}
