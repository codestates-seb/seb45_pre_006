import React, { useState, useEffect }from "react";
import { styled } from "styled-components";
import useForm from "../hooks/useForm";
import UserSearch from "../components/users/UserSearch";
import UserList from "../components/users/UserList";
import scrollToTop from "../components/utils/scrollToTop.js";
import PageButton from "../components/users/PageButton";

const StyleUsers = styled.div`
  width: 100%;
  padding: 24px 24px;
  position: relative;
  h1 {
    font-size: 27px;
  }
`;

const userData = [
  { userName: "peter", postCount: 787, img: "" },
  { userName: "user123", postCount: 32, userId: 123, img: "" },
  { userName: "john", postCount: 22, img: "" },
  { userName: "JH", postCount: 2, img: "" },
  { userName: "Wonho", postCount: 62, img: "" },
  { userName: "peter", postCount: 787, img: "" },
  { userName: "mike", postCount: 32, img: "" },
  { userName: "Tom", postCount: 16, img: "" },
  { userName: "JJ", postCount: 111, img: "" },
  { userName: "Ansel", postCount: 99, img: "" },
  { userName: "Coco", postCount: 32, img: "" },
  { userName: "JavaScript", postCount: 3, img: "" },
  { userName: "Java", postCount: 22, img: "" },
  { userName: "Pawan", postCount: 77, img: "" },
  { userName: "Wojin", postCount: 55, img: "" },
  { userName: "Kim", postCount: 334, img: "" },
  { userName: "King", postCount: 88, img: "" },
  { userName: "Jim", postCount: 98, img: "" },
];

export default function Users() {
  const [searchInput, setSearchInput] = useForm({ search: "" });
  const [userList, setUserList] = useState(userData);
  const [page, setPage] = useState({ currentPage: 1, maxPage: 20 });
  let first = useRef(true);

  const pageHandler = (page) => setPage((prePage) => ({ ...prePage, currentPage: page }));

  const handleListSetting = (user, currentPage, maxPage) => {
    setUserList(user);
    setPage({ currentPage, maxPage });
  };

  useEffect(() => {
    const search = setTimeout(() => {
      if (!first.current) {
        console.log("검색한 유저 조회");
        // 검색 응답을 받을 때 받아야 하는 데이터  - 무조건 1번째 페이지 유저 정보, 현재 페이지 정보, 마지막 페이지 정보 현재 페이지 유저정보
        handleListSetting(userData, 1, 12);
      }
      first.current = false;
    }, 1000);
    scrollToTop();
    return () => clearTimeout(search);
  }, [searchInput]);

  useEffect(() => {
    if (!first.current) {
      // 키워드가 있으면 키워드를 가지고 검색 키워드가 없으면 전체로 검색

      console.log("페이지 전환 검색 요청");
    }
  }, [page]);

  return (
    <StyleUsers>
      <div className="title">Users</div>
      <div className="filter">
        <PiMagnifyingGlass size={20} color="gray"></PiMagnifyingGlass>
        <input
          type="text"
          name="search"
          value={inputData.search}
          onChange={(e) => onInputChangeHandler(e)}
          className="search"
          placeholder="Filter by user"
        />
      </div>
      <UsersList 
        filteredUser = {filteredUser}
        ></UsersList>
    </StyleUsers>
  );
}
