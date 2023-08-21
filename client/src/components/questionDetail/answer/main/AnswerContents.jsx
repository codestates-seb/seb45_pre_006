import React, { useState, useEffect } from "react";
import ShareModal from "../../question/main/ShareModal";
import { styled } from "styled-components";
import getWriteDate from "../../../utils/getWriteDate";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const StyleAnswerContents = styled.div`
  text-align: left;
  font-size: 15px;
  line-height: 20px;
  display: flex;
  flex-direction: column;
  padding-left: 16px;
  flex: 1;
  .userInfoWrap {
    display: flex;
    justify-content: space-between;
    padding-top: 30px;
    color: var(--black-600);
  }
  .shareEdit {
    display: flex;
    > div {
      margin-right: 10px;
      > span {
        cursor: pointer;
      }
    }
  }
  .userInfo {
    background-color: var(--white);
    border-radius: 5px;
    padding: 8px;
    .useProfile {
      display: flex;
      align-items: center;
    }
  }
  .date {
    font-size: 12px;
    color: var(--black-600);
  }
  img {
    width: 32px;
    border-radius: 5px;
  }
  .username {
    cursor: pointer;
    color: var(--blue-600);
    padding-left: 7px;
  }
`;

export default function AnswerContents({ data, idx }) {
  // Share 버튼 클릭한 상태
  const [isClickedShare, setIsClickedShare] = useState(false);

  const navigate = useNavigate();

  const toggleShare = () => {
    setIsClickedShare(!isClickedShare);
  };

  // 모달 바깥클릭시 모달꺼지는 로직
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isClickedShare && !event.target.closest(".shareEdit")) {
        setIsClickedShare(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isClickedShare]);

  // edit 누를시 페이지전환
  const handleEdit = () => {
    // 로그인 -> 본인이 쓴글일때 조건을 확인해서 넣어줘야함. !!!!!!!!!!
    if (true) {
      // 데이터도 같이 넘겨줌
      // answer 배열로 넘어와서 인덱스를 주소값으로 넘겨줘야함
      navigate(`/answers/${data.answer_id}/edit`, {
        state: data,
      });
    } else {
      alert("권한이 없습니다.");
    }
  };

  // 질문 삭제 로직 **** 본인인경우에만 삭제 가능해야함
  const handleDelete = async () => {
    // 경고메세지
    const shouldDelete = window.confirm("Are you sure you want to delete this answer?");
    if (shouldDelete) {
      try {
        const response = await axios.delete(
          `https://62c2-175-125-163-108.ngrok-free.app/answers/${data.answer_id}`
        );
        if (response.status === 204) {
          console.log("Question deleted successfully");
          window.location.reload(); // 해당 질문페이지로 이동
        } else {
          console.log("Failed to delete question");
        }
      } catch (error) {
        console.error("An error occurred while deleting the question:", error);
      }
    }
  };

  return (
    <StyleAnswerContents>
      <div className="content">
        <ReactMarkdown children={data.answer_content} />
      </div>
      <div className="userInfoWrap">
        <div className="shareEdit">
          {isClickedShare ? (
            <div onClick={toggleShare}>
              <span>Share</span>
              <ShareModal data={data}></ShareModal>
            </div>
          ) : (
            <div onClick={toggleShare}>
              <span>Share</span>
            </div>
          )}
          <div className="edit" onClick={handleEdit}>
            <span>Edit</span>
          </div>
          <div className="delete" onClick={handleDelete}>
            <span>Delete</span>
          </div>
        </div>
        <div className="userInfo">
          <div className="date">asked {getWriteDate(data.answer_createdAt)}</div>
          <div className="useProfile">
            <img src="/images/userImg.png" alt="userImg" />
            <div className="username">{data.user_id}</div>
          </div>
        </div>
      </div>
    </StyleAnswerContents>
  );
}
