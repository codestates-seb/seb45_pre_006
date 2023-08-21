import React from "react";
import { styled } from "styled-components";
import { WhiteButton } from "../common/Button";
const StylePageButton = styled.div`
  display: flex;
  gap: 5px;
  button {
    padding: 3px 8px;
    font-size: 15px;
    border: 1px solid var(--black-200);
    border-radius: 5px;
    .active {
      border-color: var(--orange);
    }
  }
`;
export default function PageButton({ page, pageHandler }) {
  const { currentPage, maxPage } = page;
  console.log({ currentPage, maxPage });

  const buttonArray = () => {
    let array = [];
    if (currentPage < 5) {
      array = [2, 3, 4, 5];
    } else if (maxPage <= currentPage + 4) {
      for (let i = maxPage - 4; i < maxPage; i++) {
        array.push(i);
      }
    } else if (currentPage >= 5) {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        array.push(i);
      }
    }
    return array;
  };

  return (
    <StylePageButton>
      {currentPage !== 1 && (
        <WhiteButton onClick={() => pageHandler(currentPage - 1)} className="prev">
          Prev
        </WhiteButton>
      )}
      <WhiteButton className={1 === currentPage ? "active" : ""} onClick={() => pageHandler(1)}>
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
      <WhiteButton
        className={maxPage === currentPage ? "active" : ""}
        onClick={() => pageHandler(maxPage)}
      >
        {maxPage}
      </WhiteButton>
      {currentPage !== maxPage && (
        <WhiteButton onClick={() => pageHandler(currentPage + 1)} className="next">
          Next
        </WhiteButton>
      )}
    </StylePageButton>
  );
}

// 1페이지는 12345 ... maxPage next
// 5페이지부터는 prev 1 ... 34 5 67 ... maxPage next
