import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

import getTimeAgoText from '../utils/getTimeAgoText';

export const ListStyle = styled.ul `
  .qustions-item {
    border-bottom: 1px solid var(--border);
    display: flex;
    padding: 16px;
    gap: 20px;
  }
  .content-side-wrap {
    width: 105px;
    height: 72px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 18px 16px 5px 50px;
  }
  .content-side-wrap > span {
    color: #6a737c;
    margin: 0px 0px 15px 0px;
    margin-left: auto;
    font-size: 13px;
  }
  .content-side-wrap > span:first-child {
    color: #0c0d0e;
  }
  .question-content-wrap {
    width: 834px;
    height: 85px;
    margin: 0px 2px 12px 0;
  }
  .question-content {
    width: 100%;
    height: 100px;
    position: relative;
  }
  .question-content > h2 {
    width: 830px;
    margin: 12px 0 9px 0;
    font-size: 17px;
    color: var(--blue-500-hover);
    cursor: pointer;
    font-weight: 600;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    &:hover {
      color: var(--blue-500);
    }
  }
  .question-content > p {
    width: 818px;
    font-size: 13px;
    color: var(--black-700);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .question-user {
    height: 25px;
    position: absolute;
    display: flex;
    bottom: 2px;
    right: 30px;
  }
  .user-img {
    width: 16px;
    height: 16px;
  }
  .question-user > span {
    font-size: 12px;
    font-weight: 500;
    margin: 2px;
  }
  .question-user > span:nth-child(2) {
    color: var(--blue-500-hover);
    cursor: pointer;
    &:hover {
      color: var(--blue-500);
    }
  }
`;
export default function QuestionsList(props) {
  const navigate = useNavigate()
  console.log(props.questionsFiltered)
    return(
      <ListStyle>
        {props.questionsFiltered.map((question, idx)=>{
            return(
                <li key={idx} className="qustions-item">
                  <div className="content-side-wrap">
                    <span>0 votes</span>
                    <span>{question.question_answerCount} answers</span>
                    <span>{question.question_viewCount} views</span>
                  </div>
                  <div className="question-content-wrap">
                    <div className="question-content">
                          <h2 onClick={(tempKey)=>{navigate(`/questions/${question.question_id}`)}}>
                            {question.question_title}
                          </h2>
                          <p>
                            {question.question_content}
                          </p>
                        <div className="question-user">
                          <img src='/images/userImg.png' alt='userIcon' className='user-img'></img>
                          <span onClick={(user_name)=>{navigate(`/users/${question.userId}`)}}>
                            {question.displayName}
                          </span>
                          <span>{getTimeAgoText(question.question_createdAt)}</span>
                        </div>
                    </div>
                  </div>
                </li>
            )
        })}
      </ListStyle>
    )
}
