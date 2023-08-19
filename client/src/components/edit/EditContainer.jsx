import React, { useState, useRef } from "react";
import { styled } from "styled-components";
import EditTitle from "./EditTitle";
import EditContent from "./EditContent";
import useForm from "../../hooks/useForm";
import { useParams } from "react-router-dom";

const StyleEditContainer = styled.div`
  width: 1100px;
  .header {
    font-size: 27px;
    padding-left: 3px;
  }
`;

export default function EditContainer({ post }) {
  const editorRef = useRef(null); // WriteContent ediotr 포커스를 위한 useRef
  const { question_id, answer_id } = useParams(); // question , answer중 어디서 edit을 눌렀는지 판별하기 위함

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
      {console.log(post)}
      <div className="header">Edit</div>
      {question_id ? (
        <EditTitle
          post={post}
          inputData={inputData}
          onInputChangeHandler={onInputChangeHandler}
          clearForm={clearForm}
          handleNextClick={handleNextClick}
          length={inputData.title ? inputData.title.length : 0}
        />
      ) : null}

      <EditContent
        editorRef={editorRef}
        post={post}
        question_id={question_id}
        answer_id={answer_id}
        inputData={inputData}
      />
    </StyleEditContainer>
  );
}
