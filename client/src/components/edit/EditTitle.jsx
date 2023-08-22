import React from "react";
import { styled } from "styled-components";
import { BlueButton } from "../common/Button";
import EditGuide from "./EditGuide";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
const StyleEditTitle = styled.div`
  border: 1px solid var(--border);
  padding: 24px;
  margin-top: 16px;
  border-radius: 5px;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  width: 800px;

  div {
    padding: 5px 0;
  }
  .title {
    font-size: 15px;
    font-weight: 600;
  }
  .discription {
    font-size: 12px;
  }
  .writetitle {
    border: 1px solid var(--border);
    border-radius: 5px;
    height: 30px;
  }
  input {
    margin: 5px 0;
    padding-left: 10px;
    &::placeholder {
      color: var(--black-200);
    }
  }
  button {
    width: 55px;
    height: 35px;
    padding: auto;
  }
  .buttonSection {
    display: flex;
  }
  .alert {
    font-size: 13px;
    padding: 7px 7px 7px 10px;
    line-height: 20px;
    color: #f41b1b;
  }
`;

export default function EditTitle({
  post,
  inputData,
  onInputChangeHandler,
  clearForm,
  handleNextClick,
  length,
}) {
  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // 폼 제출시 로직을 구현해야함
      console.log("Form submitted:", inputData.title);
      if (length > 5) {
        handleNextClick(); //포커스 이동핸들러함수
        //5글자 이상일경우 포커스 이동가능
      }
    }
  };

  const handleSubmit = () => {
    // 폼 제출시 로직을 구현해야함
    console.log("Form submitted:", inputData.title);
    if (length > 5) {
      handleNextClick(); //포커스 이동핸들러함수
      //5글자 이상일경우 포커스 이동가능
    }
  };

  return (
    <Container>
      <StyleEditTitle>
        <div className="title">Title</div>
        <div className="discription">
          Be specific and imagine you’re asking a question to another person.
        </div>
        <input
          autoFocus
          type="text"
          name="title"
          value={inputData.title}
          onChange={(e) => onInputChangeHandler(e)}
          onKeyDown={handleEnterKeyPress}
          placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
          className="writetitle"
        />
        <div className="buttonSection">
          <BlueButton onClick={handleSubmit}>Next</BlueButton>
          {length > 5 || length === 0 ? null : (
            <div className="alert">Minimum 5 characters.</div>
          )}
        </div>
      </StyleEditTitle>
      <EditGuide />
    </Container>
  );
}
