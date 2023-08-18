import React, { useState } from "react";
import { styled } from "styled-components";
import { usePostContext } from "../../../../context/PostContext";
import useForm from "../../../../hooks/useForm";
import getWriteDate from "../../../common/getWriteDate";

const StyleQuestionComment = styled.div`
  grid-column: 2;
  text-align: left;
  font-size: 13px;
  padding-top: 30px;
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
    padding: 10px;
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
  .showMoreButton {
    border-top: 1px solid var(--border);
    color: var(--blue-600);
    padding: 10px;
    cursor: pointer;
    &:hover {
      color: var(--blue-500);
    }
    > span {
      font-weight: 700;
    }
  }
`;

export default function QuestionComment({ postData }) {
  // 상태 변수 추가
  const [showAllComments, setShowAllComments] = useState(false);

  // 댓글을 더 보여주기 위한 함수
  const handleShowMoreComments = () => {
    setShowAllComments(true);
  };

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

  if (!postData) {
    return <div>Loading...</div>;
  }

  return (
    <StyleQuestionComment>
      {postData.questionCommentList.map(
        (data, idx) =>
          // 5개까지만 표시
          ((!showAllComments && idx < 5) || showAllComments) && (
            <div key={idx} className="comentlist">
              <span className="commentbody">
                {data.questionComment_content} -{" "}
              </span>
              <span className="username"> {data.user_name}</span>
              <span className="createdat">
                {getWriteDate(data.questionComment_createdAt)}
              </span>
            </div>
          )
      )}
      {/* 5개 이상일경우 Show ~ more comments 렌더링 */}
      {postData.questionCommentList.length > 5 && !showAllComments && (
        <div className="showMoreButton" onClick={handleShowMoreComments}>
          Show <span>{postData.questionCommentList.length - 5}</span> more
          comments
        </div>
      )}
      {/* show more comment 누를시에만 댓글입력창 렌더링 */}
      {showAllComments && (
        <input
          type="text"
          name="comment"
          value={inputData.comment}
          onChange={(e) => onInputChangeHandler(e)}
          onKeyDown={handleEnterKeyPress}
          placeholder="Add a comment"
          className="writecomment"
        ></input>
      )}
    </StyleQuestionComment>
  );
}
