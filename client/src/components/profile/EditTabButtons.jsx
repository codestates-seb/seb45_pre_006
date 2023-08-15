import React from "react";
import { WhiteButton } from "../common/Button";
import { styled } from "styled-components";
const StyleEditTabButtons = styled.div`
  display: flex;
  flex-direction: column;
  button {
    width: 175px;
    height: 30px;
    display: flex;
    justify-content: start;
  }
`;

export default function EditTabButtons({ currentTab, currentTabHandler }) {
  const SettingButtons = [
    { text: "Edit profile", value: "profile" },
    { text: "Your logins", value: "logins" },
  ];
  return (
    <StyleEditTabButtons>
      <h4>PERSONAL INFORMATION</h4>
      {SettingButtons.map((button) => (
        <WhiteButton
          onClick={() => currentTabHandler(button.value)}
          className={currentTab === button.value ? "active" : ""}
          key={button.value}
        >
          {button.text}
        </WhiteButton>
      ))}
    </StyleEditTabButtons>
  );
}
