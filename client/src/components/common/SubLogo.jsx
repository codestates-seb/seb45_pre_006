import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const StyleSubLogo = styled.div`
  img {
    width: 50px;
    cursor: pointer;
  }
`;

export default function SubLogo() {
  const nav = useNavigate();
  return (
    <StyleSubLogo>
      <img src="/images/subLogo.png" alt="subLogo" onClick={() => nav("/")} />
    </StyleSubLogo>
  );
}
