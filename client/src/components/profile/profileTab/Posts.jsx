import React from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import PostItem from "./PostItem";

const StylePosts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .question-list {
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
  }
  .write-post {
    width: 100%;
    height: 140px;
    background: var(--app-back-color);
    border-radius: 5px;
    border: 1px solid var(--border);
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: var(--black-400);
    span {
      font-size: 15px;
      a {
        padding-left: 5px;
      }
    }
  }
`;

export default function Posts({ userProfile }) {
  const { isAdmin, postList } = userProfile;
  return (
    <StylePosts $admin={isAdmin}>
      <h4>Posts</h4>
      {!!postList.length && (
        <ul className="question-list">
          {postList.map((question) => (
            <PostItem key={question.question_id} question={question} />
          ))}
        </ul>
      )}
      {isAdmin && !postList.length && (
        <div className="write-post">
          <span>
            Write an article on a topic that interests you
            <Link to={"/ask"}>write post</Link>
          </span>
        </div>
      )}
    </StylePosts>
  );
}
