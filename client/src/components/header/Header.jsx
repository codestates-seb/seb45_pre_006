import React from "react";
import { styled } from "styled-components";
import SearchForm from "./SearchForm";
import MainLogo from "./MainLogo";
import UserActions from "./UserActions";
const StyleHeader = styled.header`
  width: 100%;
  height: 56px;
  position: fixed;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid var(--border);
  background-color: var(--white);
  border-top: 3px solid var(--orange);
  display: flex;
  .inner {
    margin: 0 auto;
    width: var(--inner);
    display: flex;
    align-items: center;
  }
`;
export default function Header() {
  return (
    <StyleHeader>
      <div className="inner">
        <MainLogo />
        <SearchForm />
        <UserActions />
      </div>
    </StyleHeader>
  );
}
