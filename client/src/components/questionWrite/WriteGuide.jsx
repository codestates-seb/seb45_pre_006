import React from "react";
import { styled } from "styled-components";

const StyleWriteGuide = styled.div`
  background-color: #ebf4fb;
  border: 1px solid #adc5dd;
  height: 240px;
  padding: 24px;
  border-radius: 5px;
  line-height: 22px;
  width: 800px;
  h2 {
    font-size: 21px;
  }
  h3 {
    font-size: 15px;
  }
  ul {
    font-size: 13px;
    list-style: disc;
    .steps {
      font-weight: 600;
      list-style: none;
    }
    li {
      margin-left: 30px;
    }
  }
`;

export default function WriteGuide() {
  return (
    <StyleWriteGuide>
      <h2>Writing a good question</h2>
      <h3>
        You’re ready to ask a programming-related question and this form will
        help guide you through the process. Looking to ask a non-programming
        question? See the topics here to find a relevant site.
      </h3>
      <ul>
        <ol className="steps">Steps</ol>
        <li>Summarize your problem in a one-line title.</li>
        <li>Describe your problem in more detail.</li>
        <li>Describe what you tried and what you expected to happen.</li>
        <li>
          Add “tags” which help surface your question to members of the
          community.
        </li>
        <li>Review your question and post it to the site.</li>
      </ul>
    </StyleWriteGuide>
  );
}
