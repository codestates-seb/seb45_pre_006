import React, { useState } from "react";
import ShareModal from "../../question/main/ShareModal";
import { styled } from "styled-components";
import { usePostContext } from "../../../../context/PostContext";

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
    > div {
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
  // Share상태
  const [isClickedShare, SetIsClickedShare] = useState(false);

  const toggleShare = (e) => {
    SetIsClickedShare(!isClickedShare);
  };

  // 질문 post 정보 받아오기
  const { post } = usePostContext();
  if (!post || !post.posts) {
    return <div>Loading...</div>;
  }
  const AnswerData = post.posts[0].Answer;

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
    <StyleAnswerContents>
      {data.content}
      <div className="userInfoWrap">
        {isClickedShare ? (
          <div onClick={(e) => toggleShare()}>
            Share
            <ShareModal
              onClick={(e) => e.stopPropagation()}
              data={data}
            ></ShareModal>
          </div>
        ) : (
          <div onClick={(e) => toggleShare()}>Share</div>
        )}
        <div className="userInfo">
          <div className="date">asked {formatDate(data.created_at)}</div>
          <div className="useProfile">
            <img src="https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMjIg/MDAxNjA0MjI4ODc1MDkx.itxFQbHQ_zAuNQJU7PCOlF0mmstYn2v4ZF4WygunqGIg.3jloNowx-eWU-ztCLACtYubVbATNdCFQLjgvYsynV1og.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%EC%A3%BC%ED%99%A9.jpg?type=w800" />
            <div className="username">{data.username}</div>
          </div>
        </div>
      </div>
    </StyleAnswerContents>
  );
}