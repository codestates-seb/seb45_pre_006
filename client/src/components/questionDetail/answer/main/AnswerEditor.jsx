import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { BlueButton } from "../../../common/Button";
import { Editor } from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../../context/AuthContext";
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
    opacity: 0.6;
  }
`;

export default function AnswerEditor({ postData }) {
  const [content, setContent] = useState("");
  let { user } = useAuthContext();
  if (!user) {
    user = { userId: "0" };
  }

  const navigate = useNavigate();

  const handlePost = async () => {
    try {
      const url = "answers";

      const requestData = {
        userId: user.userId,
        question_id: postData.question_id,
        answer_content: content,
      };

      const responseData = await api.post(url, requestData);

    } catch (error) {
    }


    navigate(0);
  };

  useEffect(() => {
    const editor = new Editor({
      autofocus: false,
      el: document.querySelector("#editor"),
      initialEditType: user.userId === "0" ? "wysiwyg" : "markdown", // 비로그인회원인경우 preview 모드로
      initialValue:
        user.userId === "0" ? `### **Only logged-in users can post answers.**` : content,
      events: {
        change: () => {
          setContent(editor.getMarkdown());
        },
      },
    });
    // 비회원일 경우 웹에디터 비활성화, 클릭시 회원가입 페이지로 이동
    if (user.userId === "0") {
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
  }, [user.userId]); // 한번실행
  // 회원만 작성가능하도록 조건부 렌더링 구현해야함!! *********** 로그인시 유저정보가 있다는점을 고려하여 코드 짜면 좋을듯
  return (
    <StyleAnswerEditor>
      <div className="title">Your Answer</div>
      <div id="editor"></div>
      <BlueButton onClick={handlePost}>Post Your Answer</BlueButton>
    </StyleAnswerEditor>
  );
}
