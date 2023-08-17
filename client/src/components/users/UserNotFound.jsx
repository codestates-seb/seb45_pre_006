import React from "react"
import { styled } from "styled-components"



const StyleUserNotFound = styled.div `
  padding: 32px 32px 32px 32px;
  width: 1051px;
  height: 315px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f8f9f9;
  border: 1px solid var(--border);
  border-radius: 6px;
  img {
    width: 196px;
    height: 196px;
  }
  span {
    font-size: 13px;
    color: var(--black-400);
    font-weight: 700;
  }
`

export default function UserNotFound (){
    return(
      <StyleUserNotFound className="not-found">
          <img src="/images/userNotFound.png" alt="userNotFound"></img>
          <span>No users matched your search.</span>
      </StyleUserNotFound>
    )
}