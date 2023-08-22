import React from "react";
import { styled } from "styled-components";
import { WhiteButton } from "../common/Button";

const StylePageButton = styled.div`
  display: flex;
  gap: 5px;
  bottom: 24px;
  right: 24px;
  width: 100%;
  justify-content: flex-end;
  margin: 20px 0;
  button {
    padding: 4px 7px;
    font-size: 15px;
    border: 1px solid var(--black-200);
    border-radius: 5px;
    &.active {
      border-color: var(--orange);
    }
  }
  span {
    line-height: 25px;
    padding: 0 5px;
  }
`;

export default function PageButton({ currentPage, maxPage, pageHandler }) {
  const generatePageArray = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  const buttonArray = () => {
    if (currentPage < 5) {
      const array = [];
      for (let i = 2; i < maxPage; i++) {
        array.push(i);
        if (i >= 5) break;
      }
      return array;
    } else if (maxPage <= currentPage + 4) {
      return generatePageArray(maxPage - 4, maxPage - 1);
    } else {
      return generatePageArray(currentPage - 2, currentPage + 2);
    }
  };

  return (
    <StylePageButton>
      {currentPage !== 1 && (
        <WhiteButton onClick={() => pageHandler(currentPage - 1)} className="prev">
          Prev
        </WhiteButton>
      )}
      <WhiteButton className={currentPage === 1 ? "active" : ""} onClick={() => pageHandler(1)}>
        1
      </WhiteButton>{" "}
      {currentPage >= 5 && <span>...</span>}
      {buttonArray().map((button) => (
        <WhiteButton
          key={button}
          className={button === currentPage ? "active" : ""}
          onClick={() => pageHandler(button)}
        >
          {button}
        </WhiteButton>
      ))}
      {currentPage + 4 < maxPage && <span>...</span>}
      {maxPage !== 1 && (
        <WhiteButton
          className={maxPage === currentPage ? "active" : ""}
          onClick={() => pageHandler(maxPage)}
        >
          {maxPage}
        </WhiteButton>
      )}
      {currentPage !== maxPage && (
        <WhiteButton onClick={() => pageHandler(currentPage + 1)} className="next">
          Next
        </WhiteButton>
      )}
    </StylePageButton>
  );
}
