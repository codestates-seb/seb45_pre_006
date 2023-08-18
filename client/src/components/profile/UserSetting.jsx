import React from "react";
import { styled } from "styled-components";
import { useState } from "react";
import SettingTabButtons from "./settingTab/SettingTabButtons";
import EditProfile from "./settingTab/EditProfile";
import Logins from "./settingTab/Logins";
const StyleUserEdit = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 50px;
  h4 {
    margin-bottom: 16px;
    font-weight: bold;
    font-size: 27px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border);
    margin-top: 3px;
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
  label,
  h5 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
  }
`;
export default function UserSetting({ userProfile, userProfileHandler }) {
  const [currentTab, setCurrentTab] = useState("profile");
  const currentTabHandler = (value) => {
    setCurrentTab(value);
  };

  return (
    <StyleUserEdit>
      <SettingTabButtons currentTab={currentTab} currentTabHandler={currentTabHandler} />
      {currentTab === "profile" ? (
        <EditProfile userProfile={userProfile} userProfileHandler={userProfileHandler} />
      ) : (
        <Logins userProfile={userProfile} />
      )}
    </StyleUserEdit>
  );
}
