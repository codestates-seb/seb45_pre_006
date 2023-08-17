import React, { useState } from "react";
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

  const handleVote = async (voteType) => {
    if (voted) {
      return; // 이미 투표한 경우 중복 투표 방지
    }

    // 주소만 수정해주자!! ##############
    const url =
      voteType === "upvote"
        ? `/answers/${data.answer_Id}/recommend`
        : `/answers/${data.answer_Id}/unrecommend`;

    try {
      const response = await axios.post(url);

      // 여기서 새로운 추천수를 업데이트하거나 필요한 로직 수행 ##############
      console.log("Vote successful:", response.data);

      // 투표 성공 후 voted 상태 업데이트
      setVoted(true);
    } catch (error) {
      console.error("Error voting:", error);
    }
  };
  return (
    <StyleAnswerVote>
      <button onClick={() => handleVote("upvote")}>
        <AiOutlineCaretUp className="icon" />
      </button>

      <div className="voteCount">{data.recommendation}</div>
      <button onClick={() => handleVote("downvote")}>
        <AiOutlineCaretDown className="icon" />
      </button>
    </StyleAnswerVote>
  );
}
