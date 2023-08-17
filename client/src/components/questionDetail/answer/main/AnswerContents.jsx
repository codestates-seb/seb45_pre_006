import React, { useState } from "react";
import ShareModal from "../../question/main/ShareModal";
import { styled } from "styled-components";
import { usePostContext } from "../../../../context/PostContext";
import getWriteDate from "../../../common/getWriteDate";
import { useNavigate } from "react-router-dom";

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
  .shareEdit {
    display: flex;
    > div {
      margin-right: 10px;
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

  // 질문 post 정보 받아오기
  const { post } = usePostContext();
  if (!post || !post.posts) {
    return <div>Loading...</div>;
  }
  const AnswerData = post.posts[0].Answer;

  // edit 누를시 페이지전환
  const handleEdit = () => {
    // 로그인 -> 본인이 쓴글일때 조건을 확인해서 넣어줘야함. !!!!!!!!!!
    if (true) {
      // 데이터도 같이 넘겨줌
      // answer 배열로 넘어와서 인덱스를 주소값으로 넘겨줘야함
      navigate(`/answers/${AnswerData[idx].answer_Id}/edit`, {
        state: post,
      });
    } else {
      alert("권한이 없습니다.");
    }
  };

  return (
    <StyleAnswerContents>
      {console.log(AnswerData[1].answer_Id)}
      {data.content}
      <div className="userInfoWrap">
        <div className="shareEdit">
          {isClickedShare ? (
            <div onClick={toggleShare}>
              Share
              <ShareModal data={data}></ShareModal>
            </div>
          ) : (
            <div onClick={toggleShare}>Share</div>
          )}
          <div className="edit" onClick={handleEdit}>
            Edit
          </div>
        </div>
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
