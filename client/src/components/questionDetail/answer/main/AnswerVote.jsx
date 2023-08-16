import React from "react";
import { styled } from "styled-components";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";

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
  return (
    <StyleAnswerVote>
      <button>
        <AiOutlineCaretUp className="icon" />
      </button>

      <div className="voteCount">{data.recommendation}</div>
      <button>
        <AiOutlineCaretDown className="icon" />
      </button>
    </StyleAnswerVote>
  );
}
