import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import useForm from "../../../../hooks/useForm";
import getWriteDate from "../../../utils/getWriteDate";
import { useNavigate, useParams } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { IoTrash } from "react-icons/io5";
import api from "../../../utils/send";
import { useAuthContext } from "../../../../context/AuthContext";

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
    padding: 11px 10px;
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
    margin-bottom: -2px;
    &:hover {
      color: var(--black-600);
    }
  }

  .editcomment {
    margin-left: 15px;
    border: 1.8px dashed var(--black-400);
    border-radius: 5px;
    width: 300px;
    &::placeholder {
      text-align: center;
    }
  }
`;

export default function QuestionComment({ postData, setPostData, userData }) {
  // 상태 변수 추가
  const [showAllComments, setShowAllComments] = useState(false);
  // 댓글 수정 관련 상태
  const [showEditInput, setShowEditInput] = useState(false);
  const [editId, setEditId] = useState("");
  // let { user } = useAuthContext();
  // if (!user) {
  //   user = { userId: "0" };
  // }

  // 주소 파라미터값 받기
  const { question_id } = useParams();

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

  // 댓글 작성 로직 axios훅 적용버전
  const handleEnterKeyPress = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      // 폼 제출시 로직을 구현해야함(완료) **** 작성자 유저id 추가로 넘겨줘야함

      const requestData = {
        userId: userData.userId,
        question_id: question_id,
        questionComment_content: inputData.comment,
      };

      try {
        const response = await api.post("question-comments", requestData);
        const newComment = {
          questionComment_id: response.data.questionComment_id,
          userId: userData.userId,
          displayName: userData.displayName,
          questionComment_content: inputData.comment,
          questionComment_createdAt: response.data.questionComment_createdAt,
        };

        setPostData({
          ...postData,
          questionCommentList: [...postData.questionCommentList, newComment],
        });
        clearForm(); // 인풋값 초기화
      } catch (error) {
        console.error("Error posting:", error);
      }
    }
  };

  console.log(postData);
  // 댓글 수정 로직
  const handleEdit = async (questionComment_id) => {
    // 폼 제출시 로직을 구현해야함(완료) **** 작성자 유저id 추가로 넘겨줘야함
    setShowEditInput(!showEditInput);
    setEditId(questionComment_id);
  };
  // 댓글 수정 로직2
  const handleEditSubmmit = async (e, questionComment_id, userId) => {
    if (e.key === "Enter") {
      e.preventDefault();

      // 폼 제출시 로직을 구현해야함(완료) **** 작성자 유저id 추가로 넘겨줘야함
      try {
        const url = `question-comments/${questionComment_id}`;

        const requestData = {
          userId: userId,
          questionComment_content: editInput.comment,
        };

        const response = await api.patch(url, requestData); // Using custom Axios hook
        const updatedCommentList = postData.questionCommentList.map(
          (comment) => {
            if (comment.questionComment_id === questionComment_id) {
              return {
                ...comment,
                questionComment_content: editInput.comment,
              };
            }
            return comment;
          }
        );

        setPostData({
          ...postData,
          questionCommentList: updatedCommentList,
        });

        setShowEditInput(false);
        setEditId("");
        // 인풋창 초기화
        onEditInputChangeHandler({ target: { name: "comment", value: "" } });
        console.log("Patch successful:", response.data);
      } catch (error) {
        console.error("Error patching:", error);
      }
    }
  };
  const handleDelete = async (questionComment_id, userId) => {
    // 폼 제출시 로직을 구현해야함(완료) **** 작성자 유저id 추가로 넘겨줘야함
    // 경고메세지
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (shouldDelete) {
      try {
        const url = `question-comments/${questionComment_id}`; // Updated URL

        const response = await api.delete(url, { userId: userId });
        const updatedCommentList = postData.questionCommentList.filter(
          (comment) => {
            return comment.questionComment_id !== questionComment_id;
          }
        );

        setPostData({
          ...postData,
          questionCommentList: updatedCommentList,
        });
        console.log("Delete successful:", response.data);
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }
  };
  console.log(postData);
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
              <span
                className="username"
                onClick={() => navigate(`/users/${data.userId}`)}
              >
                {data.displayName}
              </span>
              <span className="createdat">
                {getWriteDate(data.questionComment_createdAt)}
              </span>
              {userData.userId.toString() === data.userId.toString() && (
                <>
                  <MdEdit
                    className="icon"
                    onClick={() =>
                      handleEdit(data.questionComment_id, data.userId)
                    }
                  />
                  <IoTrash
                    className="icon"
                    onClick={() =>
                      handleDelete(data.questionComment_id, data.userId)
                    }
                  />
                </>
              )}

              {showEditInput && editId === data.questionComment_id ? (
                <input
                  type="text"
                  name="comment"
                  value={editInput.comment}
                  onChange={(e) => onEditInputChangeHandler(e)}
                  onKeyDown={(e) =>
                    handleEditSubmmit(e, data.questionComment_id)
                  }
                  placeholder="Edit your comment ➡ Enter"
                  className="editcomment"
                ></input>
              ) : null}
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
      {/* show more comment 누를시에만 댓글입력창 렌더링, 로그인 한경우만 댓글입력창 렌더링 */}
      {userData.userId !== "0" &&
        (showAllComments ||
          postData.questionCommentList.length <= 5 ||
          postData.questionCommentList.length >= 0) && (
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
