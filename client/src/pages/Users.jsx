import React, { useState, useEffect }from "react";
import { styled } from "styled-components";
import useForm from "../hooks/useForm";
import { PiMagnifyingGlass } from "react-icons/pi";
import UsersList from "../components/users/UsersList";

const StyleUsers = styled.div`
  width: 100%;
  padding: 40px 30px;
  .title {
    font-size: 27px;
    font-weight: bolder;
  }
  .filter {
    display: flex;
    align-items: center;
    margin: 25px 0px;
    > svg {
      position: absolute;
      left: 205px;
    }
  }
  .search {
    width: 190px;
    height: 37px;
    border: 1px solid var(--border);
    border-radius: 5px;
    padding-left: 40px;
    &::placeholder {
      color: var(--black-200);
      text-align: left;
    }
  }
`;

var userData = [{username:'user123', postCount: 32, userId:123},{username:'john', postCount: 22},{username:'JH', postCount: 2},{username:'Wonho', postCount: 62},{username:'peter', postCount: 787},{username:'mike', postCount: 32},{username:'Tom', postCount: 16},{username:'JJ', postCount: 111},{username:'Ansel', postCount: 99},{username:'Coco', postCount: 32},{username:'JavaScript', postCount: 3},{username:'Java', postCount: 22},{username:'Pawan', postCount: 77},{username:'Wojin', postCount: 55},{username:'Kim', postCount: 334}, {username:'King', postCount: 88},{username:'Jim', postCount: 98}]

export default function Users() {
  const initialInputData = {
    search: "",
  };
  const [inputData, onInputChangeHandler, clearForm] =
    useForm(initialInputData);
    
  const filteredUser = userData.filter((user)=>{
        return  user.username.toLowerCase().includes(inputData.search.toLowerCase())
      })

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