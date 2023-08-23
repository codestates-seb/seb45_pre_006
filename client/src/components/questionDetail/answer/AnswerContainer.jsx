import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import AnswerHeader from "./header/AnswerHeader";
import AnswerMain from "./main/AnswerMain";
import AnswerEditor from "./main/AnswerEditor";

const StyleAnswerContainer = styled.div`
  padding: 0px 16px;
`;

export default function AnswerContainer({ postData, setPostData, userData }) {
  // 필터상태 끌어올리기 => 실제 필터링 기능 구현을 위해 AnswerMain 으로 props 전달목적
  const filterOptions = [
    { value: "high", label: "Highest score (default)" },
    { value: "old", label: "Data created (oldest first)" },
  ];
  const [selectedOption, setSelectedOption] = useState(filterOptions[0]);
  // 초기렌더링시 high추천수 기준
  const [sort, setSort] = useState("high");

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setSort(selectedOption.value);
  };
  useEffect(() => {
    // 처음렌더링시 필터링 적용되도록
    setSort(selectedOption.value);
  }, [selectedOption]);

  // 답변 필터링 데이터
  const sortedData = [...postData.answerList].sort((a, b) => {
    if (b.answer_accepted && !a.answer_accepted) {
      return 1;
    }
    if (a.answer_accepted && !b.answer_accepted) {
      return -1;
    }

    if (sort === "high") {
      return b.answer_recommendation - a.answer_recommendation;
    } else {
      return (
        new Date(a.answerComment_createdAt) -
        new Date(b.answerComment_createdAt)
      );
    }
  });
  // 필터링 관련해서 질문 채택 여부를 맨위로 올리는 작업을 추가로 해줘야함

  return (
    <StyleAnswerContainer>
      <AnswerHeader
        postData={postData}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        filterOptions={filterOptions}
        setSort={setSort}
        handleSelectChange={handleSelectChange}
      />
      <AnswerMain
        postData={postData}
        sortedData={sortedData}
        setPostData={setPostData}
        userData={userData}
      />
      <AnswerEditor
        postData={postData}
        setPostData={setPostData}
        userData={userData}
      />
    </StyleAnswerContainer>
  );
}
