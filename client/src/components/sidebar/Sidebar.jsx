import React from "react";
import { FaEarthAmericas } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const StyleSideBar = styled.aside`
  width: 164px;
  position: relative;
  border-right: 1px solid var(--border);
  nav {
    margin-top: 40px;
    position: sticky;
    top: 100px;
    height: 85px;
    width: 100%;
    background-color: white;
  }
  h4 {
    color: var(--black-600);
    font-size: 12px;
    padding-left: 8px;
  }
  ul {
    margin-top: 5px;
  }
  li {
    cursor: pointer;
    width: 164px;
    height: 33px;
    color: var(--black-600);
    display: flex;
    padding: 8px;
    position: relative;
    span {
      position: absolute;
      left: 30px;
      top: 10px;
      font-size: 13px;
    }
    &:hover {
      color: var(---black-900);
    }
    &.active {
      color: var(---black-900);
      font-weight: bold;
      border-right: 3px solid var(--orange);
      background-color: var(--light-gray-hover);
    }
  }
`;

export default function Sidebar() {
  const currentPath = useLocation().pathname.split("/")[1];
  const nav = useNavigate();
  const sideMenu = [
    {
      text: "Questions",
      link: "/",
      icon: <FaEarthAmericas />,
      locations: ["", "search", "questions"],
    },
    {
      text: "Users",
      link: "/users",
      icon: null,
      locations: ["users"],
    },
  ];
  return (
    <StyleSideBar>
      <nav>
        <h4>PUBLIC</h4>
        <ul>
          {sideMenu.map((menu) => (
            <li
              onClick={() => nav(menu.link)}
              className={menu.locations.includes(currentPath) ? "active" : ""}
              key={menu.text}
            >
              {menu.icon}
              <span>{menu.text}</span>
            </li>
          ))}
        </ul>
      </nav>
    </StyleSideBar>
  );
}
