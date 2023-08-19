import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { BlueButton } from "../../../common/Button";
import { Editor } from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StyleAnswerEditor = styled.div`
  margin-bottom: 10px;
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

export default function AnswerEditor({ postData }) {
  const [content, setContent] = useState("");
  const nav = useNavigate();

  const handlePost = async () => {
    try {
      const url = "https://03d7-175-125-163-108.ngrok-free.app/answers";

      const requestData = {
        question_id: postData.question_id,
        answer_content: content,
      };

      const response = await axios.post(url, requestData);

      console.log("Post successful:", response.data);
    } catch (error) {
      console.error("Error posting:", error);
    }
    console.log("Form submitted:", content);

    nav(0);
  };

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

    return () => {
      //언마운트
      editor.destroy();
    };
  }, []); // 한번실행

  // 회원만 작성가능하도록 조건부 렌더링 구현해야함!! *********** 로그인시 유저정보가 있다는점을 고려하여 코드 짜면 좋을듯
  return (
    <StyleAnswerEditor>
      <div className="title">Your Answer</div>
      <div id="editor"></div>
      <BlueButton onClick={handlePost}>Post Your Answer</BlueButton>
    </StyleAnswerEditor>
  );
}
