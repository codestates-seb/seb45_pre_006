import React from "react";
import { styled } from "styled-components";

//미사용
const StyleVote = styled.div`
  grid-column: 1;
  display: flex;
  flex-direction: column;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--border);
    border-radius: 100%;
    width: 30px;
    height: 30px;
    text-align: center;
    svg {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
    }
  }
`;

export default function Vote() {
  return (
    <StyleVote>
      <button></button>

      <div>0</div>
      <button></button>
    </StyleVote>
  );
}
