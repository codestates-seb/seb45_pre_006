import React, { useState, useRef } from "react";
import { styled } from "styled-components";
import WriteGuide from "./WriteGuide";
import WriteTitle from "./WriteTitle";
import WriteContent from "./WriteContent";
import useForm from "../../hooks/useForm";

const StyleWriteContainer = styled.div``;

export default function WriteContainer() {
  const [inputFocused, setInputFocused] = useState(false);
  const editorRef = useRef(null); // WriteContent ediotr 포커스를 위한 useRef

  // input창 (댓글) 작성 부분
  const initialInputData = {
    title: "",
  };
  const [inputData, onInputChangeHandler, clearForm] =
    useForm(initialInputData);

  const handleNextClick = () => {
    if (editorRef.current) {
      editorRef.current.focus(); // editor에 포커스
    }
  };

  return (
    <StyleWriteContainer>
      <WriteGuide></WriteGuide>
      <WriteTitle
        inputFocused={inputFocused}
        setInputFocused={setInputFocused}
        inputData={inputData}
        onInputChangeHandler={onInputChangeHandler}
        clearForm={clearForm}
        handleNextClick={handleNextClick}
        length={inputData.title.length}
      ></WriteTitle>
      <WriteContent
        isActive={inputData.title.length > 5}
        editorRef={editorRef}
      ></WriteContent>
    </StyleWriteContainer>
  );
}
