import React, { useState, useEffect, useRef } from "react";
import { styled } from "styled-components";
import { Editor } from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import ContentGuide from "./ContentGuide";
import { BlueButton } from "../common/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  ${({ isActive }) => !isActive && "opacity: 0.5; pointer-events: none;"}
`;

const StyleWriteContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--white);
  padding: 24px;
  margin-top: 16px;
  border: 1px solid var(--border);
  border-radius: 5px;
  width: 800px;
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
    margin: 5px 0 0 0;
    width: 55px;
    height: 35px;
    padding: auto;
  }
`;

export default function WriteContent({ isActive, editorRef, inputData }) {
  const [content, setContent] = useState("");
  const [editorFocused, setEditorFocused] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const editor = new Editor({
      autofocus: false,
      el: document.querySelector("#editor"),
      initialEditType: "markdown",
      initialValue: content,
      events: {
        change: () => {
          setContent(editor.getMarkdown());
        },
        focus: () => {
          setEditorFocused(true);
        },
        blur: () => {
          setEditorFocused(false);
        },
      },
    });
    editorRef.current = editor; // ediotr 인스턴스를 ref에 할당
    return () => {
      editor.destroy();
    };
  }, []);

  // post 요청로직 !!
  // post 요청 보내고, 해당 질문으로 다시 redirect해줘야하는거 생각해야함
  // 리다이렉트시 업데이트된 데이터 get하여 렌더링해야함
  const handlePostClick = async () => {
    const editorInstance = editorRef.current;
    const markdownContent = editorInstance.getMarkdown();

    try {
      const url = "https://03d7-175-125-163-108.ngrok-free.app/questions";

      const requestData = {
        question_title: inputData.title,
        question_content: markdownContent,
      };

      const response = await axios.post(url, requestData);

      console.log("Post successful:", response.data);
      // 글 작성시 해당 작성글로 리다이렉션
      nav(`/questions/${response.data.question_id}`);
    } catch (error) {
      console.error("Error posting:", error);
    }
  };

  return (
    <Container isActive={isActive}>
      {console.log(content)}
      <StyleWriteContent>
        <div className="title">What are the details of your problem?</div>
        <div className="discription">
          Introduce the problem and expand on what you put in the title. Minimum
          20 characters.
        </div>
        <div id="editor"></div>
        <BlueButton onClick={handlePostClick}>Post</BlueButton>
      </StyleWriteContent>
      {editorFocused && <ContentGuide />}
    </Container>
  );
}
