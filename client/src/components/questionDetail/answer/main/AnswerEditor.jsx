import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { BlueButton } from "../../../common/Button";
import { Editor } from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/send";

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
  #editor.disabled {
    opacity: 0.4;
  }
`;

export default function AnswerEditor({ postData, setPostData, userData }) {
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const handlePost = async () => {
    try {
      const url = "answers";

      const requestData = {
        userId: userData.userId,
        question_id: postData.question_id,
        answer_content: content,
      };

      const responseData = await api.post(url, requestData);

      console.log("Post successful:", responseData.data);

      const newAnswer = {
        answer_id: responseData.data.answer_id,
        userId: Number(userData.userId),
        answer_content: content,
        displayName: userData.displayName,
        answer_createdAt: responseData.data.answer_createdAt,
        answer_modifiedAt: responseData.data.answer_createdAt,
      };

      setPostData({
        ...postData,
        answerList: [...postData.answerList, newAnswer],
      });
      setContent("");
      window.scrollTo({ top: 400, behavior: "smooth" });
    } catch (error) {}

    console.log("Form submitted:", content);
  };
  useEffect(() => {
    const editor = new Editor({
      autofocus: false,
      el: document.querySelector("#editor"),
      initialEditType: userData.userId === "0" ? "wysiwyg" : "markdown", // 비로그인회원인경우 preview 모드로
      initialValue:
        userData.userId === "0"
          ? `### **Only logged-in users can post answers.**`
          : content,
      events: {
        change: () => {
          setContent(editor.getMarkdown());
        },
      },
    });
    // 비회원일 경우 웹에디터 비활성화, 클릭시 회원가입 페이지로 이동
    if (userData.userId === "0") {
      const editorEl = document.querySelector("#editor");
      editorEl.classList.add("disabled");
      editorEl.addEventListener("click", () => {
        navigate("/login");
      });
    }

    return () => {
      //언마운트
      editor.destroy();
    };
  }, [userData.userId, postData]);

  return (
    <StyleAnswerEditor>
      <div className="title">Your Answer</div>
      <div id="editor"></div>
      <BlueButton onClick={handlePost}>Post Your Answer</BlueButton>
    </StyleAnswerEditor>
  );
}
