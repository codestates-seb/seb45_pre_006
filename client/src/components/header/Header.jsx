import React from "react";
import { styled } from "styled-components";

const StyleHeader = styled.header`
  width: var(--inner);
  height: 56px;
  position: fixed;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid var(--border);
  background-color: var(--white);
`;
export default function Header() {
  return <StyleHeader>Header</StyleHeader>;
}
