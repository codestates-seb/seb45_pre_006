import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { Editor } from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import FormatGuide from "./FormatGuide";
import { BlueButton } from "../common/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

export default function EditContent({ editorRef, post }) {
  const [content, setContent] = useState(post.question_content); //초기값을 질문상세페이지 질문의 content값으로
  const nav = useNavigate(); // 뒤로가기 기능 구현을 위한 훅

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
      // 주소교체하시고,
      const response = await axios.post("주소적으삼", {
        content: markdownContent,
      });

      console.log("Post successful:", response.data);
    } catch (error) {
      console.error("Error posting:", error);
    }
  };

  const handleCancel = () => {
    // 뒤로가기 구현
    nav(-1);
  };

  return (
    <Container>
      <div>
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
