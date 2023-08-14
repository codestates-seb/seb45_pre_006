import React from "react";
import { styled } from "styled-components";
import SignupDescription from "../components/signup/SignupDescription";
import SignupBox from "../components/signup/SignupBox";
const StyleSignup = styled.section`
  display: flex;
  width: 785px;
  height: 520px;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
`;
export default function Signup() {
  return (
    <StyleSignup>
      <SignupDescription />
      <SignupBox />
    </StyleSignup>
  );
}
