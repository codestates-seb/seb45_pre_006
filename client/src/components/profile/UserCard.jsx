import React from "react";
import { styled } from "styled-components";
import calculateDateDifference from "../common/calculateDateDifference";
import { MdCake } from "react-icons/md";
import { BiSolidPencil } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const StyleUserCard = styled.div`
  display: flex;
  gap: 15px;
  img {
    width: 128px;
    box-shadow: 0 2px 3px 0px var(--shadow);
  }
  .user-info {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
  }
  .user-name {
    font-size: 34px;
    font-weight: bold;
  }
  .create-at {
    color: var(--black-400);
    display: flex;
    gap: 4px;
    font-size: 14px;
    align-items: center;
    font-weight: bold;
    svg {
      margin-bottom: 6px;
    }
  }
  .edit-profile {
    cursor: pointer;
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
export default function UserCard({ userProfile }) {
  const { displayName, userId, img, createdAt, isAdmin } = userProfile;

  const nav = useNavigate();
  return (
    <StyleUserCard>
      <img src={img} alt="userImg" />
      <div className="user-info">
        <span className="user-name">{displayName}</span>
        <div className="create-at">
          <MdCake size={18} />
          <span>Member for {calculateDateDifference(createdAt)}</span>
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
