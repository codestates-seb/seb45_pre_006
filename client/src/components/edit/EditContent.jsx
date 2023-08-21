import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { Editor } from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import FormatGuide from "./FormatGuide";
import { BlueButton } from "../common/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAxiosData from "../../hooks/useAxiosData";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyleEditContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--white);
  padding: 24px;
  margin-top: 16px;
  border: 1px solid var(--border);
  border-radius: 5px;
  width: 736px;
  .title {
    font-size: 15px;
    font-weight: 600;
    padding: 5px 0px;
  }
  .discription {
    font-size: 12px;
    padding: 5px 0px;
  }
  #editor {
    padding: 10px 0px;
  }

  button {
    margin: 5px 10px 0 0;
    width: 90px;
    height: 40px;
    padding: auto;
  }
  .cancel {
    width: 70px;
    background-color: white;
    color: var(--blue-500);
    &:hover {
      background-color: #e9f3fe;
    }
  }
`;

export default function EditContent({
  editorRef,
  post,
  question_id,
  answer_id,
  inputData,
}) {
  const [qeustionContent, setQeustionContentContent] = useState(
    post.question_content
  ); //초기값을 질문상세페이지 질문의 content값으로
  const [answerContent, setAnswerContent] = useState(post.answer_content); // 초기값 답변 내용
  const navigate = useNavigate(); // 뒤로가기 기능 구현을 위한 훅
  const axiosData = useAxiosData(); //

  useEffect(() => {
    const editor = new Editor({
      autofocus: false,
      el: document.querySelector("#editor"),
      initialEditType: "markdown",
      initialValue: question_id ? qeustionContent : answerContent,
      events: {
        change: () => {
          if (question_id) {
            setQeustionContentContent(editor.getMarkdown());
          } else {
            setAnswerContent(editor.getMarkdown());
          }
        },
      },
    });

    editorRef.current = editor; // ediotr 인스턴스를 ref에 할당
    return () => {
      editor.destroy();
    };
  }, []);

  // question_id 를 여부로, 앤드포인트, 리퀘스트 바디 내용을 설정
  // post 요청 보내고, 해당 질문으로 다시 redirect해줘야하는거 생각해야함
  const handlePostClick = async () => {
    const editorInstance = editorRef.current;
    const markdownContent = editorInstance.getMarkdown();

    try {
      const url = `questions/${question_id ? question_id : answer_id}`;

      const requestData = question_id
        ? {
            userId: post.userId,
            question_title: inputData.title,
            question_content: markdownContent,
          }
        : {
            answer_content: markdownContent,
          };

      const response = await axiosData("patch", url, requestData); //

      console.log("Post successful:", response);
    } catch (error) {
      console.error("Error posting:", error);
    }
    // 수정된 내용으로 리다이렉트 & 렌더링
    // navigate(-1);
  };

  const handleCancel = () => {
    // 뒤로가기 구현
    navigate(-1);
  };

  return (
    <Container>
      <div>
        {console.log(post)}
        <StyleEditContent>
          <div className="title">What are the details of your problem?</div>
          <div className="discription">
            Introduce the problem and expand on what you put in the title.
            Minimum 20 characters.
          </div>
          <div id="editor"></div>
          <div className="buttonContainer">
            <BlueButton onClick={handlePostClick}>Save edits</BlueButton>
            <BlueButton className="cancel" onClick={handleCancel}>
              Cancel
            </BlueButton>
          </div>
        </StyleEditContent>
      </div>
      <FormatGuide />
    </Container>
  );
}
