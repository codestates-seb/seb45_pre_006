import React from "react";
import { WhiteButton } from "../../common/Button";
import { useNavigate, useLocation } from "react-router-dom";

export default function ProfileTabButtons({ userProfile }) {
  const nav = useNavigate();
  const location = useLocation().pathname.split("/")[3];
  const { userId, isAdmin } = userProfile;
  const tabButtons = [
    { text: "Profile", link: `/users/${userId}`, location: undefined },
    { text: "Settings", link: `/users/${userId}/edit`, location: "edit" },
  ];
  if (!isAdmin) tabButtons.splice(1, 2);
  return (
    <div className="tab-buttons">
      {tabButtons.map((button) => (
        <WhiteButton
          className={location === button.location ? "active" : ""}
          onClick={() => nav(button.link)}
          key={button.link}
        >
          {button.text}
        </WhiteButton>
      ))}
    </div>
  );
}
