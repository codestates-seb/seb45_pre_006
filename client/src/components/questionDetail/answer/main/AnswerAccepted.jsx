import React, { useState } from "react";
import { styled } from "styled-components";
import { PiCheckFatLight, PiCheckFatFill } from "react-icons/pi";
import axios from "axios";

const StyledAnswerAccepted = styled.div`
  padding: 10px 10px 0px 13px;
  cursor: pointer;

  svg {
    font-size: 30px;
    color: var(--black-400);
    &:hover {
      color: var(--black-900);
    }
  }
  .accepted {
    color: green;
    &:hover {
      color: #03a303;
    }
  }
`;

export default function AnswerAccepted({ data }) {
  const [isAccepted, setIsAccepted] = useState(data.answer_accepted);

  // 글 작성자일 경우에만 해당 통신이 가능하도록 구현해야함 **********
  const handleAccept = async () => {
    if (!isAccepted) {
      try {
        await axios.post(
          `https://62c2-175-125-163-108.ngrok-free.app/answers/${data.answer_id}/accept`
        );
        setIsAccepted(true);
      } catch (error) {
        console.error("Error accepting answer:", error);
      }
    } else {
      try {
        await axios.post(
          `https://62c2-175-125-163-108.ngrok-free.app/answers/${data.answer_id}/unaccept`
        );
        setIsAccepted(false);
      } catch (error) {
        console.error("Error accepting answer:", error);
      }
    }
  };

  return (
    <StyledAnswerAccepted onClick={handleAccept}>
      {isAccepted ? (
        <PiCheckFatFill className="accepted" />
      ) : (
        <PiCheckFatLight />
      )}
    </StyledAnswerAccepted>
  );
}
