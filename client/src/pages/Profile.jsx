import React from "react";
import { styled } from "styled-components";
import { Routes, Route, useParams } from "react-router-dom";
import UserCard from "../components/profile/UserCard";
import UserProfile from "../components/profile/UserProfile";
import UserSetting from "../components/profile/UserSetting";
import ProtectedRoute from "./ProtectedRoute";
import ProfileTabButtons from "../components/profile/profileTab/ProfileTabButtons";
import NotFound from "./NotFound";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

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
  const [userProfile, setUserProfile] = useState(null);
  const { profileId } = useParams();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/user/profile/${profileId}/${user.userId}`, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        });
        const { aboutMe, createdAt, displayName, email, img, postList, userId } = res.data;
        setUserProfile({ aboutMe, createdAt, displayName, email, img, postList, userId });
        // question_id, title, question_answercount,createdAt, isAdmin 필요
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!profileParams.includes(useParams()["*"])) return <NotFound />;
  if (!userProfile) {
    return <NotFound />;
  }

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
              <UserSetting userProfile={userProfile} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </StyleProfile>
  );
}

