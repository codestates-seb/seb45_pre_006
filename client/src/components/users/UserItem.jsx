import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const StyleUserItem = styled.li`
  width: calc(25% - 15px);
  display: flex;
  padding: 5px 6px 7px 7px;
  gap: 10px;
  margin-bottom: 20px;
  img {
    width: 50px;
    cursor: pointer;
    border-radius: 10px;
  }
  .user-info {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }
  .posts {
    font-size: 12px;
    color: var(--black-600);
    font-weight: bold;
  }
`;
export default function UserItem({ user }) {
  const { userId, postCount, userName, img } = user;
  const navigate = useNavigate();
  const toProfile = () => navigate(`/users/${userId}`);
  return (
    <StyleUserItem>
      <img onClick={toProfile} src={img || "/images/userImg.png"} alt="userImg" />
      <div className="user-info">
        <Link to={`/users/${userId}`}>{userName}</Link>
        <span className="posts">posts-{postCount}</span>
      </div>
    </StyleUserItem>
  );
}
