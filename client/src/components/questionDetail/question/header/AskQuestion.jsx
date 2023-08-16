import React from "react";
import { styled } from "styled-components";
import { BlueButton } from "../../../common/Button";
import { useNavigate } from "react-router-dom";

const StyleAskQuestion = styled.div`
  button {
    height: 33px;
  }
`;

export default function AskQuestion() {
  const nav = useNavigate();
  return (
    <StyleAskQuestion>
      {/* 페이지 추가하면 경로 바꿔줘야함 */}
      <BlueButton onClick={() => nav("/ask")}>Ask Question</BlueButton>
    </StyleAskQuestion>
  );
}
