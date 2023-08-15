import React from "react";
import { styled } from "styled-components";

const questionsData = {
  questions: [
    {
      question_id: 1,
      question_title: "Context",
      question_content:
        "All consumers that are descendants of a Provider will re-render whenever the Provider’s value prop changes. The propagation from Provider to its descendant consumers (including .contextType and useContext) is not subject to the shouldComponentUpdate method, so the consumer is updated even when an ancestor component skips an update.",
      question_viewcount: 128,
      created_at: "2023-08-10T10:00:00",
      updated_at: "2023-08-10T12:30:00",
      user_name: "user123",
      question_answercount: 56,
    },
    {
      question_id: 2,
      question_title: "Context",
      question_content:
        "StrictMode is a tool for highlighting potential problems in an application. Like Fragment,",
      question_viewcount: 128,
      created_at: "2023-08-10T10:00:00",
      updated_at: "2023-08-10T12:30:00",
      user_name: "user123",
      question_answercount: 45,
    },
    {
      question_id: 3,
      question_title: "Context",
      question_content:
        "In the above example, strict mode checks will not be run against the Header and Footer components. However, ComponentOne and ComponentTwo, as well as all of their descendants, will have the checks.",
      question_viewcount: 128,
      created_at: "2023-08-10T10:00:00",
      updated_at: "2023-08-10T12:30:00",
      user_name: "user123",
      question_answercount: 25,
    },
  ],
};

const QuestionStyle = styled.div`
  width: 1100px;
  background-color: #ffffff;
  margin-top: 26px;
  .all-questions-container {
    width: 1100px;
    height: 82px;
    background-color: var(--white);
    display: flex;
    flex-direction: row;
  }
  .all-questions-container > span {
    width: 570px;
    height: 35px;
    font-size: 27px;
    margin-left: 25px;
  }
  .all-questions-container > button {
    padding: 0px;
    width: 103px;
    height: 37.8px;
    background-color: var(--blue-500);
    border-radius: 5px;
    margin-left: 378px;
    font-size: 12px;
    font-weight: bold;
    color: var(--white);
    &:hover {
      background-color: var(--blue-500-hover);
    }
  }
  .questions-container {
    height: 106px;
    background-color: white;
    border-bottom: 1px solid var(--border);
    display: flex;
    flex-direction: row;
  }
  .question-side-wrap {
    width: 105px;
    height: 72px;
    background-color: red;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 17px 0px 17px 109px;
  }
  .question-side-wrap > span {
    color: var(--black-700);
  }
  .question-content-wrap {
    width: 834px;
    height: 85px;
    background-color: gray;
    margin: 10px 2px 10px;
  }
`;

export default function Question() {
  let testData = JSON.parse(JSON.stringify(questionsData));
  console.log(testData);

  return (
    <QuestionStyle>
      <div className="all-questions-container">
        <span>All question</span>
        <button>Ask Question</button>
      </div>
      <div className="questions-container">
        <div className="question-side-wrap">
          <span>0 votes</span>
          <span>0 answers</span>
          <span>22 views</span>
        </div>
        <div className="question-content-wrap">
          <div className="question-user"></div>
        </div>
      </div>
    </QuestionStyle>
  );
}
