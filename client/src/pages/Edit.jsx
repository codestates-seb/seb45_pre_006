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

  // 데이터 받기, 답변 데이터는 어떻게 포현해줘야할지 고민해야함 (질문과, 답변 공통으로 쓰이기 때문)
  // 해결 어려우면 질문용 edit, 답변용 edit 만들어야할듯
  const post = location.state;
  // 로컬스토리지에 유저정보가 있는지확인( 로그인 성공시 로컬스토리지에 유저정보가 저장됨)
  const userExistsInLocalStorage = localStorage.hasOwnProperty("user");

  if (!post) {
    if (userExistsInLocalStorage) {
      return (
        <div>
          정상적인 접근이 아닙니다. 작성글 수정을 위해서는 해당 작성글의 Edit
          버튼을 통해 접근하세요
        </div>
      );
    }
    return <div>정상적인 접근이 아닙니다. 권한없음</div>;
  }

  // edit이 question인경우와 answer인 경우 조건부렌더링으로 구현..? ******
  return (
    <StyleEdit>
      <EditContainer post={post}></EditContainer>
    </StyleEdit>
  );
}
