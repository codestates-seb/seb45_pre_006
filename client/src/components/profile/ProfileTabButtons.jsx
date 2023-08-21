import React from "react";
import { WhiteButton } from "../common/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { styled } from "styled-components";

const StyleProfileTabButtons = styled.div`
  display: flex;
  gap: 5px;
  margin: 18px 0;
`;
export default function ProfileTabButtons({ userProfile }) {
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/")[3];
  const { userId, isAdmin } = userProfile;
  const tabButtons = [
    { text: "Profile", link: `/users/${userId}`, location: undefined },
    { text: "Settings", link: `/users/${userId}/edit`, location: "edit" },
  ];
  if (!isAdmin) tabButtons.splice(1, 2);
  return (
    <StyleProfileTabButtons>
      {tabButtons.map((button) => (
        <WhiteButton
          className={location === button.location ? "active" : ""}
          onClick={() => navigate(button.link)}
          key={button.link}
        >
          {button.text}
        </WhiteButton>
      ))}
    </StyleProfileTabButtons>
  );
}
