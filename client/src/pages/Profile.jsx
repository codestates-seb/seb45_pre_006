import React from "react";
import { styled } from "styled-components";
import { Routes, Route, useParams } from "react-router-dom";
import UserCard from "../components/profile/UserCard";
import UserProfile from "../components/profile/UserProfile";
import UserSetting from "../components/profile/UserSetting";
import ProtectedRoute from "./ProtectedRoute";
import ProfileTabButtons from "../components/profile/ProfileTabButtons";
import NotFound from "./NotFound";
import { useEffect } from "react";
import { useState } from "react";
import api from "../components/utils/send";
import { useAuthContext } from "../context/AuthContext";

const StyleProfile = styled.section`
  width: 100%;
  padding: 24px;
`;

const profileParams = ["", "edit"];
const mokUser = {
  isAdmin: false,
  aboutMe: "```\nconst a = 1\n```",
  displayName: "myeongin",
  userId: "1",
  img: "/images/userImg.png",
  email: "mungin10@naver.com",
  postList: [
    {
      question_id: "1",
      question_title: "1",
      question_createdAt: new Date(),
      question_answerCount: 1,
    },
    {
      question_id: "2",
      question_title: "2",
      question_createdAt: new Date(),
      question_answerCount: 1,
    },
  ],
  createAt: new Date(),
};
export default function Profile() {
  const [userProfile, setUserProfile] = useState();
  const { profileId } = useParams();
  const { user } = useAuthContext();

  const userProfileHandler = (user) => {
    setUserProfile((preUser) => {
      return { ...preUser, ...user };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/user/profile/${profileId}/${user?.userId || 0}`, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        });
        setUserProfile({
          isAdmin: res.data.admin,
          ...res.data.response,
          img: res.data.response.img || "/images/userImg.png",
        });
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  if (!profileParams.includes(useParams()["*"])) return <NotFound />;
  if (!userProfile) return <NotFound />;

  return (
    <StyleProfile>
      <UserCard userProfile={userProfile} />
      <ProfileTabButtons userProfile={userProfile} />
      <Routes>
        <Route path="/" element={<UserProfile userProfile={userProfile} />} />
        <Route
          path="edit"
          element={
            <ProtectedRoute requireAdmin isAdmin={userProfile.isAdmin}>
              <UserSetting userProfile={userProfile} userProfileHandler={userProfileHandler} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </StyleProfile>
  );
}
