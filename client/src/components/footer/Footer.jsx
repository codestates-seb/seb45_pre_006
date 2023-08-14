import React from "react";
import { styled } from "styled-components";
import FooterContent from "./FooterContent";
import Copyright from "./Copyright";

const StyleFooter = styled.div`
  width: 100%;
  height: 258px;
  background-color: #232629;
  display: flex;
  justify-content: center;

  .inner {
    width: var(--inner);
    display: flex;
    justify-content: space-between;
    color: #9199a1;
    padding: 32px 0;
    font-size: 13px;
  }
`;

export default function Footer() {
  return (
    <StyleFooter>
      <div className="inner">
        <FooterContent />
        <Copyright />
      </div>
    </StyleFooter>
  );
}
