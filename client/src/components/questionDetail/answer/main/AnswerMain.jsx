import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import AnswerVote from "./AnswerVote";
import AnswerContents from "./AnswerContents";
import AnswerComment from "./AnswerComment";
import { useLocation } from "react-router-dom";
import PaginationControls from "./PaginationControls";
import AnswerAccepted from "./AnswerAccepted";

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

export default function AnswerMain({
  postData,
  sortedData,
  setPostData,
  userData,
}) {
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

  // 페이지네이션 구현
  const totalPages = Math.ceil(postData.answerList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // answer vote 상태 끌어올리고, props로 받아서 useEffect로 vote 카운트가 바뀔때마다 리렌더링해줘야함 *********

  return (
    <StyleAnswerMain>
      <PaginationControls
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      {sortedData.slice(startIndex, endIndex).map((answerItem, idx) => (
        <div
          key={answerItem.answer_id}
          id={answerItem.answer_id}
          className="container"
        >
          <div className="Contentscontainer">
            <div>
              <AnswerVote data={answerItem} />
              <AnswerAccepted
                data={answerItem}
                question_userId={postData.userId}
              />
            </div>
            <AnswerContents data={answerItem} idx={idx} userData={userData} />
          </div>
          <AnswerComment
            data={answerItem}
            answer_id={answerItem.answer_id}
            setPostData={setPostData}
            userData={userData}
          />
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
