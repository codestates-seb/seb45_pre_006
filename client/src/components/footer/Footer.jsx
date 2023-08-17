import React from "react";
import { styled } from "styled-components";

const StyleFooter = styled.section`
  width: 100%;
  height: 258px;
  background-color: #232629;
  display: flex;
  flex-direction: row;
  justify-content: center;

  .inner {
    width: var(--inner);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 258px;
    color: #9199a1;
    padding: 32px 0;
    font-size: 13px;

    img {
      width: 50px;
      height: 50px;
      margin-top: -18px;
    }

    .content {
      margin-left: -710px;
      p {
        color: #babfc4;
        font-weight: 900;
        margin-bottom: 15px;
      }
      ul {
        li {
          margin-top: 10px;
        }
      }
    }

    .copyright {
      width: 350px;
      display: flex;
      flex-direction: column;
      justify-content: end;
      font-size: 11px;
    }
  }
`;

export default function Footer() {
  return (
    <StyleFooter>
      <div className="inner">
        <div className="logo">
          <img src="/images/subLogo.png" alt="subLogo"></img>
        </div>
        <div className="content">
          <p>STACK OVERFLOW</p>
          <ul>
            <li> Questions </li>
            <li> Help </li>
          </ul>
        </div>
        <div className="copyright">
          <div>
            Site design / logo © 2023 Stack Exchange Inc; user contributions
            licensed under CC BY-SA. rev 2023.8.7.43566
          </div>
        </div>
      </div>
    </StyleFooter>
  );
}
