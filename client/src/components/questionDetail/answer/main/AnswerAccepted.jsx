import React, { useState } from "react";
import { styled } from "styled-components";
import { PiCheckFatLight, PiCheckFatFill } from "react-icons/pi";
import { useAuthContext } from "../../../../context/AuthContext";
import api from "../../../utils/send";

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

export default function AnswerAccepted({ data, question_userId }) {
  const [isAccepted, setIsAccepted] = useState(data.answer_accepted);

  let { user } = useAuthContext();
  if (!user) {
    user = { userId: "0" };
  }

  // 글 작성자일 경우에만 해당 통신이 가능하도록 구현해야함 **********
  const handleAccept = async () => {
    try {
      const url = `answers/${data.answer_id}/${
        isAccepted ? "unaccept" : "accept"
      }`;

      await api.post(url);

      setIsAccepted(!isAccepted);
    } catch (error) {
      console.error(
        "Error",
        isAccepted ? "unaccepting" : "accepting",
        "answer:",
        error
      );
    }
  };
  return user.userId !== "0" &&
    question_userId.toString() === user.userId.toString() ? (
    <StyledAnswerAccepted onClick={handleAccept}>
      {isAccepted ? (
        <PiCheckFatFill className="accepted" />
      ) : (
        <PiCheckFatLight />
      )}
    </StyledAnswerAccepted>
  ) : null;
}
