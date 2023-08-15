import React, { useState } from "react";
import { styled } from "styled-components";
import Select from "react-select";

const StyleAnswerFilter = styled.div`
  display: flex;
  align-items: center;
  .sortTitle {
    margin-right: 10px;
    font-size: 12px;
  }
  .css-b62m3t-container {
    font-size: 13px;
    width: 210px;
    text-align: center;
  }
`;

export default function AnswerFilter() {
  const filterOptions = [
    { value: "high", label: "Highest score (default)" },
    { value: "old", label: "Data created (oldest first)" },
  ];
  const [selectedOption, setSelectedOption] = useState(filterOptions[0]);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  return (
    <StyleAnswerFilter>
      {console.log(selectedOption)}
      <label className="sortTitle"> Sorted by: </label>
      <Select
        value={selectedOption}
        onChange={handleSelectChange}
        options={filterOptions}
      />
    </StyleAnswerFilter>
  );
}
