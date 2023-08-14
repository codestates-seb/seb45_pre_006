import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const StyleFooterLogo = styled.div`
  img {
    width: 50px;
    margin-top: -18px;
    cursor: pointer;
  }
`;

export default function FooterLogo() {
  const nav = useNavigate();
  return (
    <StyleFooterLogo>
      <div>
        <img src="/images/subLogo.png" alt="subLogo" onClick={() => nav("/")} />
      </div>
    </StyleFooterLogo>
  );
}
