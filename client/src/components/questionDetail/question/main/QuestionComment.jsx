import React from "react";
import { styled } from "styled-components";
import { usePostContext } from "../../../../context/PostContext";
import useForm from "../../../../hooks/useForm";

const StyleQuestionComment = styled.div`
  grid-column: 2;
  text-align: left;
  font-size: 13px;
  padding-top: 30px;
  .comentlist {
    border-top: 1px solid var(--border);
    padding: 10px;
    display: flex;
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
    color: var(--blue-500);
  }
  .createdat {
    color: var(--black-400);
  }
`;

export default function QuestionComment() {
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

  // 작성글 데이터 불러오는 부분
  const { post } = usePostContext();

  if (!post || !post.posts) {
    return <div>Loading...</div>;
  }
  const postData = post.posts[0].comments;

  // 날짜 포맷팅 함수
  function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  return (
    <StyleQuestionComment>
      {console.log(postData)}
      {postData.map((data, idx) => (
        <div key={idx} className="comentlist">
          <span className="commentbody">{data.commentBody} - </span>
          <span className="username"> {data.username}</span>
          <span className="createdat"> {formatDate(data.createdAt)} </span>
        </div>
      ))}
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
    </StyleQuestionComment>
  );
}
