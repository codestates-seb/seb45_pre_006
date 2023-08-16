import React from "react";
import { styled } from "styled-components";
import { useState } from "react";
import SettingTabButtons from "./settingTab/SettingTabButtons";
import EditProfile from "./settingTab/EditProfile";
import Logins from "./settingTab/Logins";
const StyleUserEdit = styled.div`
  display: flex;
  gap: 30px;
`;
export default function UserSetting({ user }) {
  const [currentTab, setCurrentTab] = useState("profile");
  const currentTabHandler = (value) => {
    setCurrentTab(value);
  };

  return (
    <StyleUserEdit>
      <SettingTabButtons currentTab={currentTab} currentTabHandler={currentTabHandler} />
      {currentTab === "profile" ? <EditProfile user={user} /> : <Logins user={user} />}
    </StyleUserEdit>
  );
}
