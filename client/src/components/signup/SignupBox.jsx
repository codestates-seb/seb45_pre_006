import React from "react";
import { styled } from "styled-components";
import SiteSignup from "./SiteSignup";
import GoogleSignup from "./GoogleSignup";

const StyleSignup = styled.div`
  width: 316px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export default function SignupBox() {
  return (
    <StyleSignup>
      <GoogleSignup />
      <SiteSignup />
    </StyleSignup>
  );
}
