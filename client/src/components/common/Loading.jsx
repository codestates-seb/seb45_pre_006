import React from "react";
import { styled } from "styled-components";

const LoadingStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1100px;
  height: 100px;
  background-color: #ffffff;
  .circle {
    width: 10px;
    height: 10px;
    background-color: var(--orange);
    border-radius: 50%;
    margin: 10px;
    animation: bounce 0.6s ease-in infinite;
    animation-direction: alternate;
  }
  .circle:nth-child(2) {
    animation-delay: 0.1s;
  }
  .circle:nth-last-child(3) {
    animation-delay: 0.2s;
  }
  @keyframes bounce {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(10px);
    }
  }
`;

export default function Loading() {
  return (
    <LoadingStyle className="loader">
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
    </LoadingStyle>
  );
}
