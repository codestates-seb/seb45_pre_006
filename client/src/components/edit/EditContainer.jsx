import React, { useState, useRef } from "react";
import { styled } from "styled-components";
import EditTitle from "./EditTitle";
import EditContent from "./EditContent";
import useForm from "../../hooks/useForm";

const StyleEditContainer = styled.div`
  width: 1100px;
  .header {
    font-size: 27px;
    padding-left: 3px;
  }
`;

export default function EditContainer({ post }) {
  const editorRef = useRef(null); // WriteContent ediotr 포커스를 위한 useRef

  // input창 (댓글) 작성 부분
  const initialInputData = {
    title: post.question_title, // 질문 상세페이지 데이터의 타이틀값
  };
  const [inputData, onInputChangeHandler, clearForm] =
    useForm(initialInputData);

  const handleNextClick = () => {
    if (editorRef.current) {
      editorRef.current.focus(); // editor에 포커스
    }
  };

  return (
    <StyleEditContainer>
      {console.log(inputData)}
      <div className="header">Edit</div>
      <EditTitle
        post={post}
        inputData={inputData}
        onInputChangeHandler={onInputChangeHandler}
        clearForm={clearForm}
        handleNextClick={handleNextClick}
        length={inputData.title.length}
      ></EditTitle>
      <EditContent editorRef={editorRef} post={post}></EditContent>
    </StyleEditContainer>
  );
}
