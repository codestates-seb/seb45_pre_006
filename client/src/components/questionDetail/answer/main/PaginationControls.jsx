import React from "react";
import { styled } from "styled-components";

const StylePaginationControls = styled.div`
  padding: 5px 0;
  margin-bottom: 5px;
  color: var(--black-750);
  button {
    border: 1px solid var(--border);
    border-radius: 5px;
    margin-right: 5px;
    height: 25px;
    width: 25px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  }
  button:hover {
    background-color: var(--black-200);
  }
  button.active {
    background-color: var(--orange);
    color: white;
  }
  .next {
    width: 45px;
    height: 25px;
  }
`;

export default function PaginationControls({
  totalPages,
  currentPage,
  onPageChange,
}) {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  // 페이지 버튼 클릭시 뷰포인트 이동 (위로 조금 이동)
  const scrollToAnswersContainer = () => {
    const answersContainer = document.getElementById("container");
    if (answersContainer) {
      const offset = -100; // 스크롤위치조정
      const topPosition =
        answersContainer.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top: topPosition, behavior: "smooth" });
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => {
            handlePageChange(i);
            scrollToAnswersContainer();
          }}
          className={i === currentPage ? "active" : ""}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  // totalPage가 1 이하거나 0인 경우 Next 버튼 렌더링하지 않음
  const renderNextButton = () => {
    if (totalPages > 1) {
      return (
        <button
          className="next"
          onClick={() => {
            handlePageChange(currentPage + 1);
            scrollToAnswersContainer();
          }}
        >
          Next
        </button>
      );
    }
    return null;
  };

  return (
    <StylePaginationControls id="container">
      {renderPageNumbers()}
      {renderNextButton()}
    </StylePaginationControls>
  );
}
