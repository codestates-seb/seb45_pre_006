import React from "react";
import { styled } from "styled-components";

const StyleCopyright = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  font-size: 11px;
  line-height: 12px;
`;

export default function Copyright() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const referenceDate = new Date(1900, 0, 1);
  const serialDateNumber = Math.floor(
    (date - referenceDate) / (24 * 60 * 60 * 1000)
  );

  return (
    <StyleCopyright>
      <div>
        Site design / logo © {year} Stack Exchange Inc; user contributions
        licensed under CC BY-SA. rev {year}.{month + 1}.{day} {serialDateNumber}
      </div>
    </StyleCopyright>
  );
}
