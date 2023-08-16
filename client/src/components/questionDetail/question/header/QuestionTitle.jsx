import React, { useEffect } from "react";
import axios from "axios";
import { styled } from "styled-components";
import AskQuestion from "./AskQuestion";
import { usePostContext } from "../../../../context/PostContext";

const StyleQuestionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  .title {
    font-size: 27px;
  }
`;

export default function QuestionTitle() {
  const { post, setPost } = usePostContext();

  if (!post || !post.posts) {
    return <div>Loading...</div>;
  }

  return (
    <StyleQuestionTitle>
      <div className="title">
        {post ? post.posts[0].question_title : "Loading..."}
      </div>
      <AskQuestion></AskQuestion>
    </StyleQuestionTitle>
  );
}
