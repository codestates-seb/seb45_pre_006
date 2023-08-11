import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const StyleMainLogo = styled.h1`
  cursor: pointer;
  width: 164px;
  padding: 0 7px;
  height: 100%;
  display: flex;
  align-items: center;
  &:hover {
    background-color: var(--gray-hover);
  }
  img {
    width: 145px;
  }
`;
export default function MainLogo() {
  const nav = useNavigate();
  return (
    <StyleMainLogo onClick={() => nav("/")}>
      <img src="/images/mainLogo.png" alt="mainLogo" />
    </StyleMainLogo>
  );
}
