import React from "react";
import { styled } from "styled-components";

const StyleSideBar = styled.aside`
  width: 164px;
  position: relative;
  border-right: 1px solid var(--border);
  nav {
    margin-top: 40px;
    position: sticky;
    top: 100px;
    height: 85px;
    width: 100%;
    background-color: white;
  }
`;
export default function Sidebar() {
  return (
    <StyleSideBar>
      <nav>nav</nav>
    </StyleSideBar>
  );
}
