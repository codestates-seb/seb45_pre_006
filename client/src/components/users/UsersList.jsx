import React, { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

import UserNotFound from "./UserNotFound";

const StyleUsersList = styled.div`
    width: 1111px;
    display: grid;
    grid-template-rows: 107px;
    grid-template-columns: repeat(4, 263px );
    box-sizing: border-box; 
    grid-auto-rows: 97px;
`;

const StyleUser = styled.div`
  margin:5px 6px 7px 7px ;
  display: flex;
  align-items: center;
  img {
      width: 48px;
      height: 48px;
  }
  div {
      display: flex;
      flex-direction: column;
      margin-left: 9px;
  }
  div > span:first-child {
      font-size: 18px;
      font-weight: 700;
      color: var(--blue-500-hover);
      cursor: pointer;
      &:hover {
      color: var(--blue-500);
      }
  }
  div > span:nth-child(2) {
      margin-top: 5px;
      font-size: 15px;
      font-weight: 800;
  }
`;


export default function UsersList(props) {
  const currentPath = useNavigate();
  const usernameHandler = (id)=> {
    currentPath(`/users/${id}`)
  }
  return (
    <StyleUsersList>

      {props.filteredUser !== 0 ?
        props.filteredUser.map((user,idx)=>{
        return(
          <StyleUser key={idx}>
            <img src="/images/userImg.png" alt="userImg"></img>
            <div>
                <span onClick={()=>{usernameHandler(user.userId)}}>{user.username}</span>
                <span>{user.postCount}</span>
            </div>
          </StyleUser>
        )
      })
      :
      <UserNotFound></UserNotFound>
      }   
    </StyleUsersList>);
}