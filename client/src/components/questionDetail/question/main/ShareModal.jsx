import React from "react";
import { styled } from "styled-components";

const StyleShareModal = styled.div`
  position: absolute;
  padding: 10px;
  background: #ffffff;
  border-radius: 5px;
  font-size: 13px;
  text-align: left;
  width: 320px;
  height: 90px;
  transform: translateY(10px);
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  & ::after {
    content: "";
    position: absolute;
    border-style: solid;
    border-width: 0 8px 8px 8px;
    border-color: #ffffff transparent;
    display: block;
    width: 0;
    z-index: 1;
    top: -8px;
    left: 10px;
  }

  &::before {
    content: "";
    position: absolute;
    border-style: solid;
    border-width: 0 8px 8px 8px;
    border-color: var(--border) transparent;
    display: block;
    width: 0;
    z-index: 0;
    top: -9px;
    left: 10px;
  }

  .text {
    color: var(--black-900);
    font-weight: 800;
  }

  .link {
    border: 1px solid var(--border);
    border-radius: 5px;
    padding: 10px 5px;
    margin-top: 10px;
    color: var(--black-900);
  }
`;
export default function ShareModal({ onClick, data }) {
  const currentUrl = window.location.href.split("?")[0];
  return (
    <StyleShareModal onClick={onClick}>
      <div className="text">Share a link to this question </div>
      <div className="link">
        {currentUrl}?section=
        {data.answer_Id}
      </div>
    </StyleShareModal>
  );
}
