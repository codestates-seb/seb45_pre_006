import React from "react";
import { PiMagnifyingGlass } from "react-icons/pi";
import { styled } from "styled-components";
import Input from "../common/Input";

const StyleUserSearch = styled.form`
  margin-top: 24px;
  position: relative;
  input {
    width: 190px;
    height: 36px;
    padding-left: 30px;
    font-size: 15px;
  }
  svg {
    position: absolute;
    top: 9px;
    left: 5px;
  }
`;
export default function UserSearch({ search, setSearchInput }) {
  return (
    <StyleUserSearch onSubmit={() => console.log(search)}>
      <PiMagnifyingGlass size={19} color="gray" />
      <Input
        type="text"
        name="search"
        value={search}
        onChange={setSearchInput}
        placeholder="Filter by user"
      />
    </StyleUserSearch>
  );
}
