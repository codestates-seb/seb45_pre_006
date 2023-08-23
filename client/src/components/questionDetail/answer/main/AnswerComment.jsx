import React, { useState } from "react";
import { styled } from "styled-components";
import useForm from "../../../../hooks/useForm";
import getWriteDate from "../../../utils/getWriteDate";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { IoTrash } from "react-icons/io5";
import api from "../../../utils/send";
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
    cursor: pointer;
    &:hover {
      color: var(--blue-500);
      font-weight: 600;
    }
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
  .icon {
    font-size: 16px;
    color: var(--black-400);
    margin-left: 2px;
    margin-bottom: -3px;
    &:hover {
      color: var(--black-600);
    }
  }
  .editcomment {
    margin-left: 15px;
    border: 1.8px dashed var(--black-400);
    border-radius: 5px;
    width: 300px;
    padding-left: 5px;
    &::placeholder {
      text-align: center;
    }
  }
`;

export default function AnswerComment({ data, answer_id, userData }) {
  // 상태 변수 추가
  const [showAllComments, setShowAllComments] = useState(false);
  const [commentList, setCommentList] = useState(data.answerCommentList);

  // 댓글 수정 관련 상태
  const [showEditInput, setShowEditInput] = useState(false);
  const [editId, setEditId] = useState("");

  const navigate = useNavigate();

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

  // 댓글 edit 부분
  const [editInput, onEditInputChangeHandler] = useForm(initialInputData);

  const handleEnterKeyPress = async () => {
    try {
      const url = "answer-comments";
      const requestData = {
        userId: userData.userId,
        answer_id: answer_id,
        answerComment_content: inputData.comment,
      };

      const responseData = await api
        .post(url, requestData)
        .then((res) => res.data);

      const newComment = {
        answerComment_id: responseData.answerComment_id,
        userId: userData.userId,
        displayName: userData.displayName,
        answerComment_content: inputData.comment,
        answerComment_createdAt: responseData.answerComment_createdAt,
      };

      setCommentList([...commentList, newComment]);
      clearForm();
    } catch (error) {
      console.error("Error posting:", error);
    }
  };

  // 댓글 수정 로직
  const handleEdit = async (answerComment_id) => {
    // 폼 제출시 로직을 구현해야함(완료) **** 작성자 유저id 추가로 넘겨줘야함
    setShowEditInput(!showEditInput);
    setEditId(answerComment_id);
  };
  // 댓글 수정 로직2
  const handleEditSubmit = async (e, answerComment_id) => {
    if (e.key === "Enter") {
      e.preventDefault();

      try {
        const url = `answer-comments/${answerComment_id}`;
        const requestData = {
          userId: userData.userId,
          answer_id: answer_id,
          answerComment_content: editInput.comment,
        };

        const responseData = await api
          .patch(url, requestData)
          .then((res) => res.data);

        const updatedCommentList = commentList.map((comment) =>
          comment.answerComment_id === answerComment_id
            ? { ...comment, answerComment_content: editInput.comment }
            : comment
        );

        setCommentList(updatedCommentList);
        setShowEditInput(false);
        setEditId("");
        // 인풋창 초기화
        onEditInputChangeHandler({ target: { name: "comment", value: "" } });
      } catch (error) {
        console.error("Error posting:", error);
      }
    }
  };
  const handleDelete = async (answerComment_id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (shouldDelete) {
      try {
        const url = `answer-comments/${answerComment_id}`;
        await api.delete(url);

        const updatedCommentList = commentList.filter(
          (comment) => comment.answerComment_id !== answerComment_id
        );

        setCommentList(updatedCommentList);
      } catch (error) {
        console.error("Error posting:", error);
      }
    }
  };

  return (
    <StyleAnswerComment>
      {commentList
        ? commentList.map(
            (data, idx) =>
              // 5개까지만 표시
              ((!showAllComments && idx < 5) || showAllComments) && (
                <div key={idx} className="comentlist">
                  <span className="commentbody">
                    {data.answerComment_content} -
                  </span>
                  <span
                    className="username"
                    onClick={() => navigate(`/users/${data.userId}`)}
                  >
                    {data.displayName}
                  </span>
                  <span className="createdat">
                    {getWriteDate(data.answerComment_createdAt)}
                  </span>
                  {userData.userId.toString() === data.userId.toString() && (
                    <>
                      <MdEdit
                        className="icon"
                        onClick={() => handleEdit(data.answerComment_id)}
                      />
                      <IoTrash
                        className="icon"
                        onClick={() => handleDelete(data.answerComment_id)}
                      />
                    </>
                  )}
                  {showEditInput && editId === data.answerComment_id ? (
                    <input
                      type="text"
                      name="comment"
                      value={editInput.comment}
                      onChange={(e) => onEditInputChangeHandler(e)}
                      onKeyDown={(e) =>
                        handleEditSubmit(e, data.answerComment_id)
                      }
                      placeholder="Edit your comment ➡ Enter"
                      className="editcomment"
                    ></input>
                  ) : null}
                </div>
              )
          )
        : null}
      {/* 5개 이상일경우 Show ~ more comments 렌더링 */}
      {commentList
        ? commentList.length > 5 &&
          !showAllComments && (
            <div className="showMoreButton" onClick={handleShowMoreComments}>
              Show <span>{commentList.length - 5}</span> more comments
            </div>
          )
        : null}

      {userData.userId !== "0" && (
        <input
          type="text"
          name="comment"
          value={inputData.comment}
          onChange={(e) => onInputChangeHandler(e)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleEnterKeyPress();
            }
          }}
          placeholder="Add a comment"
          className="writecomment"
        />
      )}
    </StyleAnswerComment>
  );
}
