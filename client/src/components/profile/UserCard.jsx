import React from "react";
import { styled } from "styled-components";
import calculateDateDifference from "../common/calculateDateDifference";
import { MdCake } from "react-icons/md";
import { BiSolidPencil } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const StyleUserCard = styled.div`
  height: 128px;
  width: 100%;
  display: flex;
  gap: 15px;
  img {
    width: 128px;
    box-shadow: 0 2px 3px 0px var(--shadow);
  }
  .description {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
  }
  .user-name {
    font-size: 34px;
  }
  .create-at {
    color: var(--black-400);
    display: flex;
    gap: 4px;
    font-size: 14px;
    align-items: center;
    font-weight: bold;
    svg {
      margin-bottom: 2px;
    }
  }
  .edit-profile {
    cursor: pointer;
    width: 100px;
    height: 35px;
    padding: 9.5px;
    border: 1px solid var(--border);
    border-radius: 5px;
    margin-top: -10px;
    display: flex;
    font-size: 12px;
    align-items: center;
    gap: 5px;
    &:hover {
      background-color: var(--app-back-color);
    }
  }
`;
export default function UserCard({ user }) {
  const { userName, userId, img, create_At, isAdmin } = user;
  const nav = useNavigate();
  return (
    <StyleUserCard>
      <img src={img || "/images/userImg.png"} alt="userImg" />
      <div className="description">
        <span className="user-name">{userName}</span>
        <div className="create-at">
          <MdCake size={18} />
          <span>Member for {calculateDateDifference(create_At)}</span>
        </div>
      </div>
      {isAdmin && (
        <button className="edit-profile" onClick={() => nav(`/users/${userId}/edit`)}>
          <BiSolidPencil size={17} />
          Edit profile
        </button>
      )}
    </StyleUserCard>
  );
}
