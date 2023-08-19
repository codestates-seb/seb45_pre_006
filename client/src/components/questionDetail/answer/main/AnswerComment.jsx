import React, { useState } from "react";
import { styled } from "styled-components";
import useForm from "../../../../hooks/useForm";
import getWriteDate from "../../../utils/getWriteDate";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

export default function AnswerComment({ data, answer_id }) {
  // 상태 변수 추가
  const [showAllComments, setShowAllComments] = useState(false);

  const nav = useNavigate();

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

  const handleEnterKeyPress = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // 폼 제출시 로직을 구현해야함
      try {
        const url =
          "https://03d7-175-125-163-108.ngrok-free.app/answer-comments";

        const requestData = {
          answer_id: answer_id,
          answerComment_content: inputData.comment,
        };

        const response = await axios.post(url, requestData);

        console.log("Post successful:", response.data);
      } catch (error) {
        console.error("Error posting:", error);
      }
      console.log("Form submitted:", inputData.comment);
      clearForm(); //  입력값 초기화
      nav(0);
    }
  };

  const postData = data.answerCommentList;

  return (
    <StyleAnswerComment>
      {postData.map(
        (data, idx) =>
          // 5개까지만 표시
          ((!showAllComments && idx < 5) || showAllComments) && (
            <div key={idx} className="comentlist">
              <span className="commentbody">
                {data.answerComment_content} -{" "}
              </span>
              <span className="username"> {data.user_id}</span>
              <span className="createdat">
                {getWriteDate(data.answerComment_createdAt)}
              </span>
            </div>
          )
      )}
      {/* 5개 이상일경우 Show ~ more comments 렌더링 */}
      {postData.length > 5 && !showAllComments && (
        <div className="showMoreButton" onClick={handleShowMoreComments}>
          Show <span>{postData.length - 5}</span> more comments
        </div>
      )}

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
