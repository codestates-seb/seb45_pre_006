import React from "react";
import { styled } from "styled-components";
import FooterLogo from "./FooterLogo";
import FooterNav from "./FooterNav";

const StyleFooterContent = styled.div`
  display: flex;
  img {
    width: 50px;
    margin-top: -18px;
    cursor: pointer;
  }
`;

export default function FooterContent() {
  return (
    <StyleFooterContent>
      <FooterLogo />
      <FooterNav />
    </StyleFooterContent>
  );
}
