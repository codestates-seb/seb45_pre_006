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
import { useAuthContext } from "../context/AuthContext";
import network from "../components/utils/network";

const StyleProfile = styled.section`
  width: 100%;
  padding: 24px;
`;

const profileParams = ["", "edit"];

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
    try {
      const res = network("get", `/user/profile/${profileId}/${user?.userId || 0}`);
      const { admin, response } = res.data;
      setUserProfile({ isAdmin: admin, ...response, img: response.img || "/images/userImg.png" });
    } catch (e) {
      console.log(e);
    }
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
