import React from "react";
import { signupSvg } from "../../utils/svg";
import { styled } from "styled-components";

const StyleSignupDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  flex: 1;
  padding-right: 50px;
  h3 {
    font-weight: bold;
    font-size: 26px;
  }
  li {
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    font-weight: 600;
    gap: 10px;
    svg {
      width: 26px;
      height: 26px;
    }
    path {
      fill: var(--blue-500);
    }
    span {
      flex: 1;
    }
  }
`;

export default function SignupDescription() {
  const signupDescriptions = [
    {
      paths: signupSvg.ask,
      text: "Get unstuck — ask a question",
    },
    {
      paths: signupSvg.voting,
      text: "Unlock new privileges like voting and commenting",
    },
    {
      paths: signupSvg.label,
      text: "Save your favorite questions, answers, watch tags, and more",
    },
    {
      paths: signupSvg.badges,
      text: "Earn reputation and badges",
    },
  ];
  return (
    <StyleSignupDescription>
      <h3>Join the Stack Overflow community</h3>
      <ul>
        {signupDescriptions.map((description) => (
          <li key={description.text}>
            <svg>
              {description.paths.map((path) => (
                <path d={path} key={path} />
              ))}
            </svg>
            <span>{description.text}</span>
          </li>
        ))}
      </ul>
    </StyleSignupDescription>
  );
}
