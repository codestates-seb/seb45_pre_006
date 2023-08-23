import React from "react";
import { styled } from "styled-components";
import WriteContainer from "../components/questionWrite/WriteContainer";

const WriteStyle = styled.div`
  width: var(--inner);
  background-color: var(--app-back-color);
  padding: 0 24px 24px 24px;

  .write-headline-container {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
  }
  .write-headline-container > h1 {
    height: 35px;
    font-size: 27px;
    font-weight: bold;
  }
  .write-headline-container > img {
    margin: 20px 0;
  }
`;

export default function QuentionWrite() {
  return (
    <WriteStyle>
      <div className="write-headline-container">
        <h1>Ask a public qeustion</h1>
        <img src="/images/AskImg.png" alt="AskSideImg" />
      </div>
      <WriteContainer></WriteContainer>
    </WriteStyle>
  );
}
