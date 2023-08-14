import React from "react";
import { styled } from "styled-components";
import SubLogo from "../common/SubLogo";
import FooterNav from "./FooterNav";

const StyleFooterContent = styled.div`
  display: flex;
  img {
    margin-top: -18px;
  }
`;

export default function FooterContent() {
  return (
    <StyleFooterContent>
      <SubLogo />
      <FooterNav />
    </StyleFooterContent>
  );
}
