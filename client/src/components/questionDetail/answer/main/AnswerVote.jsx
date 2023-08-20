import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import axios from "axios";

const StyleAnswerVote = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 55px;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--border);
    border-radius: 100%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    &:hover {
      background-color: #ffe5d6;
    }
  }

  .icon {
    font-size: 20px;
    color: var(--black-750);
  }

  .voteCount {
    font-size: 19px;
    font-weight: 700;
    margin: 10px 0;
    text-align: center;
  }
`;

export default function Vote({ data }) {
  const [voted, setVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(data.answer_recommendation);

  // 추천 중복 방지 로직이 필요할것같음*********
  // 예를들어 서버의 답변 정보에서 추천을 한사람의 user_id 정보를 저장하는등********
  // or 서버분들이 힘들다고 하시면 로컬스토리지에 저장된 유저정보를 이용하는것도 방법

  // 추천 1번 누른경우 비추는 2번 누를수있음!! << 수정해야함 **********
  const handleUpvote = async () => {
    if (voted) {
      return;
    }

    try {
      await axios.post(
        `https://62c2-175-125-163-108.ngrok-free.app/answers/${data.answer_id}/recommend`
      );
      setVoted(!voted);
      setVoteCount(voteCount + 1);
    } catch (error) {
      console.error("Error upvoting:", error);
    }
  };

  const handleDownvote = async () => {
    if (!voted) {
      return;
    }
    try {
      await axios.post(
        `https://62c2-175-125-163-108.ngrok-free.app/answers/${data.answer_id}/unrecommend`
      );
      setVoted(!voted);
      setVoteCount(voteCount - 1);
    } catch (error) {
      console.error("Error downvoting:", error);
    }
  };

  return (
    <StyleAnswerVote>
      {console.log(voted)}
      <button onClick={handleUpvote}>
        <AiOutlineCaretUp className="icon" />
      </button>
      <div className="voteCount">{voteCount}</div>
      <button onClick={handleDownvote}>
        <AiOutlineCaretDown className="icon" />
      </button>
    </StyleAnswerVote>
  );
}
