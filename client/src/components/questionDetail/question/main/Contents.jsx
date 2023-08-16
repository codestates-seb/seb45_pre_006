import React, { useState } from "react";
import ShareModal from "./ShareModal";
import { styled } from "styled-components";
import { usePostContext } from "../../../../context/PostContext";
import getWriteDate from "../../../common/getWriteDate";

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

export default function Contents() {
  // Share상태
  const [isClickedShare, setIsClickedShare] = useState(false);
  const [closeShare, setCloseShare] = useState(false);

  const toggleShare = (e) => {
    setIsClickedShare(!isClickedShare);
  };

  // 질문 post 정보 받아오기
  const { post } = usePostContext();
  if (!post || !post.posts) {
    return <div>Loading...</div>;
  }
  const postData = post.posts[0];

  return (
    <StyleContents onClick={toggleShare}>
      {console.log(postData)}
      {postData.question_content}
      <div className="userInfoWrap">
        {isClickedShare ? (
          <div onClick={(e) => toggleShare()}>
            Share
            <ShareModal data={postData}></ShareModal>
          </div>
        ) : (
          <div onClick={(e) => toggleShare()}>Share</div>
        )}
        <div className="userInfo">
          <div className="date">asked {getWriteDate(postData.created_at)}</div>
          <div className="useProfile">
            <img src="/images/userImg.png" alt="userImg" />
            <div className="username">{postData.user_name}</div>
          </div>
        </div>
      </div>
    </StyleContents>
  );
}
