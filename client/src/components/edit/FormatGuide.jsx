import React from "react";
import { styled } from "styled-components";

const StyleFormatGuide = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #dfd4ae;
  border-radius: 3px;
  margin: 16px 0 0 16px;
  width: 380px;
  font-size: 15px;
  padding-bottom: 15px;

  background-color: #fdf7e2;
  .title {
    padding: 13px 10px;
    margin-bottom: 3px;
    border-bottom: 1px solid #dfd4ae;
    background-color: #fbf3d5;
  }
  .content {
    font-size: 12px;
    line-height: 17px;
    padding: 0 10px;
    letter-spacing: 0.15px;
    ul {
      list-style-type: disc;
      margin-left: 25px;
      li {
        margin-top: 8px;
      }
      div {
        font-size: 14px;
        background-color: var(--light-gray-hover);
        border-radius: 5px;
        width: 170px;
        padding: 10px;
        font-style: italic;
        margin-left: -15px;
      }
    }
  }
`;

export default function FormatGuide() {
  return (
    <StyleFormatGuide>
      <div className="title">How to Format</div>
      <div className="content">
        <ul>
          <li>create code fences with backticks ` or tildes ~</li>
          <div>
            ``` <br />
            like so
            <br /> <br /> ```
          </div>
          <li>add language identifier to highlight codet</li>
          <div>
            ``` <br />
            python <br />
            def function(foo):
            <br /> 　　print(foo)
            <br />
            <br />
            ```
          </div>
          <li>put returns between paragraphs</li>
          <li>for linebreak add 2 spaces at end</li>
          <li>indent code by 4 spaces</li>
          <li>backtick escapes `like _so_`</li>
          <li>{`quote by placing > at start of line`}</li>
          <li>
            to make links (use https whenever possible)
            <br />
            &lt;https://example.com&gt;
            <br />
            [example](https://example.com)
            <br />
            {'<a href="https://example.com">example</a>'}
          </li>
        </ul>
      </div>
    </StyleFormatGuide>
  );
}
