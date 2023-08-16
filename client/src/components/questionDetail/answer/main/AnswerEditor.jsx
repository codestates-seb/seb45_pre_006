import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { BlueButton } from "../../../common/Button";
import { Editor } from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import axios from "axios";

const StyleAnswerEditor = styled.div`
  .title {
    font-size: 19px;
    padding-top: 20px;
    margin-bottom: 16px;
  }
  button {
    height: 38px;
    margin: 10px 0;
  }
`;

export default function AnswerEditor() {
  const [content, setContent] = useState("");

  const handlePost = async () => {
    try {
      // 서버통신  content에 입력값이 마크다운형식으로 저장됨
      const response = await axios.post("주소", { content });

      if (response.status === 200) {
        console.log("Answer posted successfully");
      } else {
        console.error("Failed to post answer");
      }
    } catch (error) {
      console.error("Error while posting answer:", error);
    }
  };

  useEffect(() => {
    const editor = new Editor({
      el: document.querySelector("#editor"),
      initialEditType: "markdown",
      initialValue: content,
      events: {
        change: () => {
          setContent(editor.getMarkdown());
        },
      },
    });

    return () => {
      //언마운트
      editor.destroy();
    };
  }, []); // 한번실행

  // 회원만 작성가능하도록 조건부 렌더링 구현해야함!!
  return (
    <StyleAnswerEditor>
      <div className="title">Your Answer</div>
      <div id="editor"></div>
      <BlueButton onClick={handlePost}>Post Your Answer</BlueButton>
    </StyleAnswerEditor>
  );
}
