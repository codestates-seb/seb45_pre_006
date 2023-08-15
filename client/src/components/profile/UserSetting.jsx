import React from "react";
import { styled } from "styled-components";
import { useState } from "react";
import EditTabButtons from "./EditTabButtons";
const StyleUserEdit = styled.div``;
export default function UserSetting({ user }) {
  const [currentTab, setCurrentTab] = useState("profile");
  const currentTabHandler = (value) => {
    setCurrentTab(value);
  };

  console.log(currentTab);
  return (
    <StyleUserEdit>
      <EditTabButtons currentTab={currentTab} currentTabHandler={currentTabHandler} />
    </StyleUserEdit>
  );
}
