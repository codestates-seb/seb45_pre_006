import React from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
const StyleNotFound = styled.div`
  background-color: var(--app-back-color);
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 280px;
  gap: 10px;
  img {
    width: 250px;
    border-radius: 30px;
  }
  a {
    margin-top: -50px;
    font-size: 15px;
  }
`;

export default function NotFound() {
  return (
    <StyleNotFound>
      <img src="/images/notFound.png" alt="notFound" />
      <Link to="/">Home</Link>
    </StyleNotFound>
  );
}
