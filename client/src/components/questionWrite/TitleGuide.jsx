import React from "react";
import { styled } from "styled-components";

const StyleTitleGuide = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: 3px;
  margin: 16px 0 0 16px;
  width: 380px;
  font-size: 15px;

  background-color: var(--white);
  .title {
    padding: 13px 10px;
    margin-bottom: 15px;
    border-bottom: 1px solid var(--border);
    background-color: var(--gray-hover);
  }
  .content {
    display: flex;
    font-size: 12px;
    line-height: 17px;
    div {
      display: flex;
      align-items: center;
    }
  }
  svg {
    padding: 20px 18px;
    width: 110px;
    height: 100px;
    path {
      width: 50px;
    }
  }
`;
export default function TitleGuide() {
  const path =
    "M28.53 2.82c.4-.58 1.2-.73 1.79-.32l4.22 2.92c.58.4.72 1.2.32 1.79L10.82 41.87c-.13.18-.3.33-.5.43l-4.77 2.28c-.9.44-1.93-.29-1.83-1.29l.55-5.2c.02-.22.1-.43.22-.6L28.53 2.81Zm4.43 3.81L29.74 4.4 28.2 6.6l3.22 2.24 1.53-2.21Zm-2.6 3.76-3.23-2.24-20.32 29.3 3.22 2.24 20.32-29.3ZM5.7 42.4 8.62 41l-2.57-1.78-.34 3.18Zm35.12.3a1 1 0 1 0-.9-1.78 35 35 0 0 1-7.94 3.06c-1.93.43-3.8.3-5.71-.04-.97-.17-1.93-.4-2.92-.64l-.3-.07c-.9-.21-1.81-.43-2.74-.62-2.9-.58-6.6-.49-9.43.65a1 1 0 0 0 .74 1.86c2.4-.96 5.68-1.07 8.3-.55.88.18 1.77.4 2.66.6l.3.08c1 .24 2 .48 3.03.66 2.07.37 4.22.53 6.5.02 3-.67 5.77-1.9 8.41-3.22Z";
  return (
    <StyleTitleGuide>
      <div className="title">Writing a good title</div>
      <div className="content">
        <svg>
          <path d={path}></path>
        </svg>
        <div>
          Your title should summarize the problem.
          <br />
          <br /> You might find that you have a better idea of your title after
          writing out the rest of the question.
        </div>
      </div>
    </StyleTitleGuide>
  );
}
