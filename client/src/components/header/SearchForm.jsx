import React, { useEffect } from "react";
import { styled } from "styled-components";
import useForm from "../../hooks/useForm";
import Input from "../common/Input";
import { GrSearch } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useKeywordContext } from "../../context/SearchKeywordContext";

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
  const { keyword, keywordHandler } = useKeywordContext();
  const [searchForm, setSearchForm] = useForm({ search: "" });
  const nav = useNavigate();

  useEffect(() => {
    // 키워드를 주소창으로부터 받아와서 설정
    setSearchForm(null, "search", keyword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  const onSearchSubmitHandler = (e) => {
    e.preventDefault();
    keywordHandler(searchForm.search);
    nav(`/search/${searchForm.search}`); // 검색시 검색 페이지로 이동
  };

  return (
    <StyleSearchForm onSubmit={onSearchSubmitHandler}>
      <GrSearch />
      <label htmlFor="search-input" className="hidden">
        게시글 검색
      </label>
      <Input
        placeholder="Search..."
        id="search-input"
        $width="100%"
        $height="33px"
        $padding="10px 8px 8px 32px"
        $size="13px"
        $active={true}
        value={searchForm.search}
        name="search"
        onChange={setSearchForm}
      />
    </StyleSearchForm>
  );
}
