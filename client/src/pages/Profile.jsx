import React from "react";
import { styled } from "styled-components";
import { Routes, Route, useParams } from "react-router-dom";
import UserCard from "../components/profile/UserCard";
import UserProfile from "../components/profile/UserProfile";
import UserSetting from "../components/profile/UserSetting";
import AdminProtectedRoute from "./AdminProtectedRoute";
import ProfileTabButtons from "../components/profile/ProfileTabButtons";
import NotFound from "./NotFound";

const StyleProfile = styled.section`
  width: 100%;
  padding: 24px 10px 24px 24px;
  .tab-buttons {
    margin-top: 18px;
    display: flex;
    gap: 5px;
    margin-bottom: 20px;
  }
`;
const profileParams = ["", "edit"];

export default function Profile() {
  if (!profileParams.includes(useParams()["*"])) return <NotFound />;

  const user = {
    email: "hgd@gmail.com",
    userName: "ㅁㄴㅇㄹ",
    aboutMe: "hello",
    img: "",
    userId: "123123",
    create_At: new Date(2021, 4, 15),
    isAdmin: true,
    questionList: [
      {
        question_id: "1",
        title: "제목1",
        created_at: new Date(2023, 7, 15),
        question_answercount: "3",
      },
      {
        question_id: "2",
        title: "제목2",
        created_at: new Date(2023, 7, 15),
        question_answercount: "4",
      },
      {
        question_id: "3",
        title: "제목1",
        created_at: new Date(2023, 7, 15),
        question_answercount: "3",
      },
      {
        question_id: "4",
        title: "제목2",
        created_at: new Date(2023, 7, 15),
        question_answercount: "4",
      },
      {
        question_id: "5",
        title: "제목1",
        created_at: new Date(2023, 7, 15),
        question_answercount: "3",
      },
      {
        question_id: "6",
        title: "제목2",
        created_at: new Date(2023, 7, 15),
        question_answercount: "4",
      },
      {
        question_id: "7",
        title: "제목1",
        created_at: new Date(2013, 6, 10),
        question_answercount: "3",
      },
      {
        question_id: "8",
        title: "제목",
        created_at: Date.now(),
        question_answercount: "4",
      },
      {
        question_id: "9",
        title: "제목1",
        created_at: new Date(2023, 7, 15),
        question_answercount: "3",
      },
      {
        question_id: "10",
        title: "제목2",
        created_at: new Date(2023, 7, 15),
        question_answercount: "4",
      },
    ],
  };

  return (
    <StyleProfile>
      <UserCard user={user} />
      <ProfileTabButtons user={user} />
      <Routes>
        <Route path="/" element={<UserProfile user={user} />} />
        <Route
          path="edit"
          element={
            <AdminProtectedRoute user={user}>
              <UserSetting user={user} />
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </StyleProfile>
  );
}
