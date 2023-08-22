import React from "react";
import { PiMagnifyingGlass } from "react-icons/pi";
import { styled } from "styled-components";
import Input from "../common/Input";
import Loading from "../common/Loading";

const StyleUserSearch = styled.form`
  margin-top: 24px;
  position: relative;
  input {
    width: 190px;
    height: 36px;
    padding-left: 30px;
    font-size: 13px;
  }
  svg {
    position: absolute;
    top: 9px;
    left: 5px;
  }
  .loader {
    width: 50px;
    height: 10px;
    padding-top: 10px;
    .circle {
      width: 5px;
      height: 5px;
      margin: 3px;
    }
  }
`;
export default function UserSearch({ search, isLoading, setSearchInput }) {
  return (
    <StyleUserSearch onSubmit={(e) => e.preventDefault()}>
      <PiMagnifyingGlass size={19} color="gray" />
      <Input
        type="text"
        name="search"
        value={search}
        onChange={setSearchInput}
        placeholder="Filter by user"
      />
      {isLoading && <Loading />}
    </StyleUserSearch>
  );
}
