import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import useForm from "../hooks/useForm";
import UserSearch from "../components/users/UserSearch";
import UserList from "../components/users/UserList";
import scrollToTop from "../components/utils/scrollToTop.js";
import PageButton from "../components/users/PageButton";
import api from "../components/utils/send";
import UserNotFound from "../components/users/UserNotFound";

const StyleUsers = styled.div`
  width: 100%;
  padding: 24px;
  position: relative;
  h1 {
    font-size: 27px;
  }
`;

export default function Users() {
  const [searchInput, setSearchInput] = useForm({ search: "" });
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const firstRender = useRef(true);
  const currentPage = useRef(1);
  const maxPage = useRef(1);

  const fetchUsers = async () => {
    setIsLoading(true);
    const page = currentPage.current - 1;
    const keyword = searchInput.search;
    const url = keyword ? `/user/search?page=${page}&keyword=${keyword}` : `/user?page=${page}`;

    try {
      const response = await api.get(url).then((res) => res.data);
      const { pageInfo, data } = response;
      handleListSetting(data, pageInfo.page, pageInfo.totalPages);
    } catch (error) {}

    setIsLoading(false);
  };

  const handleListSetting = (user, page, totalPage) => {
    setUserList(user);
    currentPage.current = page;
    maxPage.current = totalPage;
  };

  const pageHandler = async (pageNum) => {
    scrollToTop();
    currentPage.current = pageNum;
    fetchUsers();
  };

  useEffect(() => {
    scrollToTop();
    if (!firstRender.current) {
      const searchTimer = setTimeout(() => {
        currentPage.current = 1;
        fetchUsers();
      }, 1000);
      return () => clearTimeout(searchTimer);
    } else {
      fetchUsers();
      firstRender.current = false;
    }
  }, [searchInput]);

  return (
    <StyleUsers>
      <h1>Users</h1>
      <UserSearch
        search={searchInput.search}
        isLoading={isLoading}
        setSearchInput={setSearchInput}
      />
      {!!userList.length && (
        <>
          <UserList userList={userList} />
          <PageButton
            currentPage={currentPage.current}
            maxPage={maxPage.current}
            pageHandler={pageHandler}
          />
        </>
      )}
      {!userList.length && !isLoading && <UserNotFound />}
    </StyleUsers>
  );
}
