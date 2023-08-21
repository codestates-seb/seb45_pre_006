import React from "react";
import { WhiteButton } from "../../common/Button";
import { styled } from "styled-components";
const StyleSettingTabButtons = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    font-size: 12px;
    padding: 6px 12px;
    font-weight: 600;
  }
  button {
    width: 185px;
    height: 30px;
    display: flex;
    justify-content: start;
  }
`;

export default function SettingTabButtons({ currentTab, currentTabHandler }) {
  const SettingButtons = [
    { text: "Edit profile", value: "profile" },
    { text: "Your logins", value: "logins" },
  ];
  return (
    <StyleSettingTabButtons>
      <h3>PERSONAL INFORMATION</h3>
      {SettingButtons.map((button) => (
        <WhiteButton
          onClick={() => currentTabHandler(button.value)}
          className={currentTab === button.value ? "active" : ""}
          key={button.value}
        >
          {button.text}
        </WhiteButton>
      ))}
    </StyleSettingTabButtons>
  );
}
