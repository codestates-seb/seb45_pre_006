import React, { useState, useEffect } from "react";
import ShareModal from "./ShareModal";
import { styled } from "styled-components";
import { usePostContext } from "../../../../context/PostContext";
import getWriteDate from "../../../common/getWriteDate";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    return <div>Loading...</div>;
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

  return (
    <StyleContents>
      {console.log(postData)}
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
        </div>
        <div className="userInfo">
          <div className="date">
            asked {getWriteDate(postData.question_createdAt)}
          </div>
          <div className="useProfile">
            <img src="/images/userImg.png" alt="userImg" />
            <div className="username">{postData.user_id}</div> {/******/}
          </div>
        </div>
      </div>
    </StyleContents>
  );
}
