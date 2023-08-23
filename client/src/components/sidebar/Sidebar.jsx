import React from "react";
<<<<<<< HEAD
import { useState, useRef } from "react";
import { GrFormSchedule, GrUser } from "react-icons/gr";
import { css, styled } from "styled-components";

=======
import { FaEarthAmericas } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
>>>>>>> 57a0bb741d5897e78203b5fbd5945d1e85b8c566

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
<<<<<<< HEAD
  div > span {
    width: 54px;
    height: 14px;
    margin-left: 2px;
    color: var(--black-600);
  }
  .question-li {
    width: 164px;
    height: 33px;
    font-weight: ${props => props.$selector ? "700": "400" };
    border-right: ${props => props.$selector ? "3px solid var(--orange)": "1px solid var(--border)" };
    background-color: ${props => props.$selector ? "var(--light-gray-hover)": "white" };
  }
  .users-li {
    width: 164px;
    height: 33px;
    font-weight: ${props => props.$selector ? "400": "700" };
    border-right: ${props => props.$selector ? "1px solid var(--border)": "3px solid var(--orange)" };
    background-color: ${props => props.$selector ? "white": "var(--light-gray-hover)" }
  }
  a {
    display: flex;
    padding: 8px 6px 8px 0;
    text-decoration: none;
  }
  a > span {
    color: "var(--black-750)";
  }
  .icon {
    width: 17px;
    height: 17px;
    flex-shrink: 0;
    margin-top: -1px;
    margin-right: 4px;
    vertical-align: baseline;
=======
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
>>>>>>> 57a0bb741d5897e78203b5fbd5945d1e85b8c566
  }
`;

export default function Sidebar() {
<<<<<<< HEAD
  const [ selector, setSelector ] = useState(true);

  const questionHandler =(e)=>{
    setSelector(true);
  }
  const usersHandler = (e) =>{
    setSelector(false);
  }


  console.log(selector)
  return (
    <StyleSideBar $selector={selector}>
      <nav>
          <div>
            <span>PUBLIC</span>
            <ol>
              <li onClick={questionHandler} className="question-li">
                <a>
                  <GrFormSchedule className="icon"/>
                  <span>Question</span>
                </a>
              </li>
              <li  onClick={usersHandler} className="users-li">
                <a>
                  <GrUser className="icon" />
                  <span>Users</span>
                </a>
              </li>
            </ol>
          </div>
=======
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
>>>>>>> 57a0bb741d5897e78203b5fbd5945d1e85b8c566
      </nav>
    </StyleSideBar>
  );
}