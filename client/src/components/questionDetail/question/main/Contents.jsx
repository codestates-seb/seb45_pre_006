import React, { useState, useEffect } from "react";
import ShareModal from "./ShareModal";
import { styled } from "styled-components";
import { usePostContext } from "../../../../context/PostContext";
import getWriteDate from "../../../utils/getWriteDate";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../../common/Loading";

const StyleContents = styled.div`
  text-align: left;
  font-size: 15px;
  line-height: 20px;
  display: flex;
  flex-direction: column;
  .userInfoWrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 30px;
    color: var(--black-600);

    > div {
      cursor: pointer;
    }
  }

  .shareEdit {
    display: flex;
    > div {
      margin-right: 10px;
    }
  }
  .userInfo {
    background-color: var(--powder-100-hover);
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

export default function Contents({ postData }) {
  // Share상태
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

  if (!postData) {
    return <Loading></Loading>;
  }

  // edit 누를시 페이지전환
  const handleEdit = () => {
    // 로그인 -> 본인이 쓴글일때 조건을 확인해서 넣어줘야함. !!!!!!!!!!********
    if (true) {
      // 데이터도 같이 넘겨줌
      navigate(`/questions/${postData.question_id}/edit`, {
        state: postData,
      });
    } else {
      alert("권한이 없습니다.");
    }
  };

  // 질문 삭제 로직 **** 본인인경우에만 삭제 가능해야함
  const handleDelete = async () => {
    // 경고메세지
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this question?"
    );
    if (shouldDelete) {
      try {
        const response = await axios.delete(
          `https://62c2-175-125-163-108.ngrok-free.app/questions/${postData.question_id}`
        );
        if (response.status === 204) {
          console.log("Question deleted successfully");
          navigate(-2); // 홈으로 이동
        } else {
          console.log("Failed to delete question");
        }
      } catch (error) {
        console.error("An error occurred while deleting the question:", error);
      }
    }
  };

  // 수정된지 여부를 판단하고 알맞는 날자데이터를 뿌려주는 로직 **** 서버 버그 수정해야함(질문상세들어가면 수정시간이 변경되는버그)
  const isModified =
    postData.question_createdAt !== postData.question_modifiedAt;
  const dateInfo =
    postData.question_createdAt === postData.question_modifiedAt
      ? postData.question_createdAt
      : postData.question_modifiedAt;

  return (
    <StyleContents>
      {/* {console.log(postData.question_createdAt)}
      {console.log(postData.question_modifiedAt)} */}
      {postData.question_content}
      <div className="userInfoWrap">
        <div className="shareEdit">
          {isClickedShare ? (
            <div onClick={toggleShare}>
              Share
              <ShareModal data={postData}></ShareModal>
            </div>
          ) : (
            <div className="share" onClick={toggleShare}>
              Share
            </div>
          )}
          <div className="edit" onClick={handleEdit}>
            Edit
          </div>
          <div className="delete" onClick={handleDelete}>
            Delete
          </div>
        </div>
        <div className="userInfo">
          {isModified ? (
            <div className="date">modified {getWriteDate(dateInfo)}</div>
          ) : (
            <div className="date">asked {getWriteDate(dateInfo)}</div>
          )}

          <div className="useProfile">
            <img src="/images/userImg.png" alt="userImg" />
            <div className="username">{postData.user_id}</div> {/******/}
          </div>
        </div>
      </div>
    </StyleContents>
  );
}
