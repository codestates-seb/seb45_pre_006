import React from "react";
import { styled } from "styled-components";
import useForm from "../../../../hooks/useForm";

// questionComment 코드 중복 로직이 많음

const StyleAnswerComment = styled.div`
  font-size: 13px;
  padding-top: 10px;
  width: 1000px;
  margin-left: auto;
  line-height: 15px;
  .comentlist {
    border-top: 1px solid var(--border);
    padding: 10px;
    flex-wrap: wrap;
    > span {
      padding-right: 5px;
    }
  }
  .writecomment {
    border-top: 1px solid var(--border);
    padding: 15px;
    width: 100%;
    &::placeholder {
      color: var(--black-200);
    }
  }
  .username {
    color: var(--blue-600);
  }
  .createdat {
    color: var(--black-400);
  }
`;

export default function AnswerComment({ data }) {
  // input창 (댓글) 작성 부분
  const initialInputData = {
    comment: "",
  };
  const [inputData, onInputChangeHandler, clearForm] =
    useForm(initialInputData);

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // 폼 제출시 로직을 구현해야함
      console.log("Form submitted:", inputData.comment);
      clearForm(); //  입력값 초기화
    }
  };

  // 날짜 포맷팅 함수
  function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour12: false, // Set this option to use 24-hour format
    };

    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    const time = new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return `${formattedDate}, at ${time}`;
  }

  return (
    <StyleAnswerComment>
      <div className="comment-list">
        {data.comment.map((comment, idx) => (
          <div key={idx} className="comentlist">
            <span className="commentbody">{comment.commentBody} - </span>
            <span className="username"> {comment.username}</span>
            <span className="createdat">{formatDate(comment.createdAt)}</span>
          </div>
        ))}
      </div>

      {/* 5개 이상일경우 Show ~ more comments 렌더링 */}
      <input
        type="text"
        name="comment"
        value={inputData.comment}
        onChange={(e) => onInputChangeHandler(e)}
        onKeyDown={handleEnterKeyPress}
        placeholder="Add a comment"
        className="writecomment"
      ></input>
    </StyleAnswerComment>
  );
}
