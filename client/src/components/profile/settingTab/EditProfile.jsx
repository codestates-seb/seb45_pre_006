import React, { useEffect } from "react";
import { styled } from "styled-components";
import useForm from "../../../hooks/useForm";
import ErrorInput from "../../common/ErrorInput";
import useError from "../../../hooks/useError";
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { BlueButton, PowderButton } from "../../common/Button";
import { useNavigate } from "react-router-dom";
import api from "../../utils/send";

const StyleEditProfile = styled.div`
  flex: 1;
`;

export default function EditProfile({ userProfile, userProfileHandler }) {
  const { displayName, aboutMe, userId } = userProfile;
  const [editForm, setEditForm] = useForm({ displayName, aboutMe });
  const [error, setError] = useError({ displayName: "" });
  const navigate = useNavigate();

  const displayNameValidation = () => {
    if (editForm.displayName.length < 2) {
      setError({ displayName: "displayName must be at least 2 characters" });
      return false;
    }
    setError({ displayName: "" });
    return true;
  };

  const onSubmitHandler = async () => {
    if (displayNameValidation()) {
      try {
        const { displayName, aboutMe } = editForm;
        await api.patch(`/user/profile/${userId}`, { displayName, aboutMe });
        userProfileHandler({ displayName, aboutMe });
        alert("저장되었습니다");
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    const editor = new Editor({
      el: document.querySelector("#editor"),
      initialEditType: "markdown",
      initialValue: aboutMe || "",
      autofocus: false,
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
      <div id="editor" />
      <div className="buttons">
        <BlueButton onClick={onSubmitHandler}>Save profile</BlueButton>
        <PowderButton onClick={() => navigate(`/users/${userId}`)}>Cancel</PowderButton>
      </div>
    </StyleEditProfile>
  );
}
