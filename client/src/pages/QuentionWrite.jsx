import React from "react";
import { styled } from "styled-components";


 const WriteStyle = styled.div `
  width: 1264px;
  height: 2103px;
  background-color: #F8F9F9;
  padding:0 24px 24px 24px;

  .write-headline-container {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
  }
  .write-headline-container > h1 {
    width: 260px;
    height: 35px;
    font-size: 27px;
    font-weight: bold;
    margin: 24px 0 27px 0;
  }
  .write-headline-container > img {
    width: 900px;
    height: 140px;
  }
 `


export default function QuentionWrite() {
  return (


    <WriteStyle>
      <div className="write-headline-container">
        <h1>Ask a public qeustion</h1>
        <img src="/images/AskImg.png" alt="AskSideImg"></img>
      </div>
    </WriteStyle>


  );
}
