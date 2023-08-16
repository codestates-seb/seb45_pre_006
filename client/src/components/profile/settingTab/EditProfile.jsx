import React, { useEffect } from "react";
import { styled } from "styled-components";
import useForm from "../../../hooks/useForm";
import ErrorInput from "../../common/ErrorInput";
import useError from "../../../hooks/useError";
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { BlueButton, PowderButton } from "../../common/Button";
import { useNavigate } from "react-router-dom";

const StyleEditProfile = styled.div`
  flex: 1;
  h4 {
    font-weight: bold;
    font-size: 27px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 16px;
    margin-top: 3px;
  }
  label,
  h5 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  input {
    height: 35px;
    width: 400px;
    font-size: 13px;
    padding: 8px 10px;
  }
  .buttons {
    margin-top: 20px;
    display: flex;
    gap: 5px;
    button {
      width: 100px;
      height: 33px;
    }
  }
`;
export default function EditProfile({ user }) {
  const { userName, aboutMe, userId } = user;
  const [editForm, setEditForm] = useForm({ displayName: userName, aboutMe });
  const [error, setError] = useError({ displayName: "" });
  const nav = useNavigate();

  const onSubmitHandler = () => {
    setError({ displayName: "" });
    if (editForm.displayName.length < 2) {
      setError({ displayName: "displayName must be at least 2 characters" });
    } else {
        // 개인정보 수정 요청
    }
  };

  useEffect(() => {
    const editor = new Editor({
      el: document.querySelector("#editor"),
      initialEditType: "markdown",
      previewStyle: "vertical",
    });
    setEditForm(null, "aboutMe", editor.getMarkdown());
    editor.on("change", () => {
      setEditForm(null, "aboutMe", editor.getMarkdown());
    });
    return () => {
      editor.destroy();
    };
  }, []);

  return (
    <StyleEditProfile>
      <h4>Edit your profile</h4>
      <ErrorInput
        label="Display name"
        type="text"
        name="displayName"
        value={editForm.displayName}
        onChange={setEditForm}
        error={error.displayName}
      />
      <h5>About me</h5>
      <div id="editor"></div>
      <div className="buttons">
        <BlueButton onClick={onSubmitHandler}>Save profile</BlueButton>
        <PowderButton onClick={() => nav(`/users/${userId}`)}>Cancle</PowderButton>
      </div>
    </StyleEditProfile>
  );
}
