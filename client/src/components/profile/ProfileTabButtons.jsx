import React from "react";
import { WhiteButton } from "../common/Button";
import { useNavigate, useLocation } from "react-router-dom";

export default function ProfileTabButtons({ user }) {
  const nav = useNavigate();
  const location = useLocation().pathname.split("/")[3];
  const tabButtons = [
    { text: "Profile", link: `/users/${user.userId}`, location: undefined },
    { text: "Settings", link: `/users/${user.userId}/edit`, location: "edit" },
  ];
  if (!user.isAdmin) tabButtons.splice(1, 2);
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
