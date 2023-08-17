import React from "react";
import { styled } from "styled-components";
import EditContainer from "../components/edit/EditContainer";
import { useLocation } from "react-router-dom";

const StyleEdit = styled.div`
  width: var(--inner);
  padding: 40px 24px 24px 24px;
`;

export default function Edit() {
  const location = useLocation();

  // 데이터 받기
  const post = location.state.posts[0];

  return (
    <StyleEdit>
      {console.log(post)}
      <EditContainer post={post}></EditContainer>
    </StyleEdit>
  );
}
