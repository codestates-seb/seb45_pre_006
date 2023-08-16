import React, { useState } from "react";
import ShareModal from "../../question/main/ShareModal";
import { styled } from "styled-components";
import { usePostContext } from "../../../../context/PostContext";
import getWriteDate from "../../../common/getWriteDate";

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
    flex-direction: row;
    justify-content: space-between;
    padding-top: 30px;
    color: var(--black-600);
    div {
      cursor: pointer;
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

export default function AnswerContents({ data }) {
  // Share 버튼 클릭한 상태
  const [isClickedShare, setIsClickedShare] = useState(false);

  const toggleShare = () => {
    setIsClickedShare(!isClickedShare);
  };

  // 질문 post 정보 받아오기
  const { post } = usePostContext();
  if (!post || !post.posts) {
    return <div>Loading...</div>;
  }
  const AnswerData = post.posts[0].Answer;

  return (
    <StyleAnswerContents>
      {data.content}
      <div className="userInfoWrap">
        {isClickedShare ? (
          <div onClick={toggleShare}>
            Share
            <ShareModal data={data}></ShareModal>
          </div>
        ) : (
          <div onClick={toggleShare}>Share</div>
        )}
        <div className="userInfo">
          <div className="date">asked {getWriteDate(data.created_at)}</div>
          <div className="useProfile">
            <img src="/images/userImg.png" alt="userImg" />
            <div className="username">{data.username}</div>
          </div>
        </div>
      </div>
    </StyleAnswerContents>
  );
}
