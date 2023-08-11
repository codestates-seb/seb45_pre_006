import React from "react";
import { styled } from "styled-components";
import useForm from "../../hooks/useForm";
import Input from "../common/Input";
import { GrSearch } from "react-icons/gr";

const StyleSearchForm = styled.form`
  flex: 1;
  position: relative;
  padding: 0 12px;
  svg {
    font-size: 21px;
    position: absolute;
    top: 6px;
    left: 19px;
    font-weight: bold;
    path {
      stroke: var(--black-400);
    }
  }
`;

export default function SearchForm() {
  const [searchForm, setSearchForm] = useForm({ search: "" });

  const onSearchSubmitHandler = (e) => {
    e.preventDefault();
    // 검색 기능 구현
  };

  return (
    <StyleSearchForm onSubmit={onSearchSubmitHandler}>
      <GrSearch />
      <label htmlFor="search-input" className="hidden">
        게시글 검색
      </label>
      <Input
        id="search-input"
        $width="100%"
        $height="33px"
        $padding="8px 8px 8px 32px"
        $size="15px"
        $active={true}
        value={searchForm.search}
        name="search"
        onChange={setSearchForm}
      />
    </StyleSearchForm>
  );
}
