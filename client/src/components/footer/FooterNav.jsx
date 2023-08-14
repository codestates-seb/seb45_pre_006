import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const StyleFooterNav = styled.div`
  padding-left: 15px;
  h4 {
    color: #babfc4;
    font-weight: 900;
  }
  ul {
    margin-top: 15px;
    li {
      margin-top: 10px;
      cursor: pointer;
    }
  }
`;

export default function FooterNav() {
  const nav = useNavigate();
  return (
    <StyleFooterNav>
      <h4>STACK OVERFLOW</h4>
      <ul>
        <li onClick={() => nav("/")}> Questions </li>
        <li> Help </li>
      </ul>
    </StyleFooterNav>
  );
}
