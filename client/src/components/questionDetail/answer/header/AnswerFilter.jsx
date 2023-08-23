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

export default function AnswerFilter({
  postData,
  selectedOption,
  setSelectedOption,
  filterOptions,
  setSort,
  handleSelectChange,
}) {
  return (
    <StyleAnswerFilter>
      <label className="sortTitle"> Sorted by: </label>
      <Select
        value={selectedOption}
        onChange={handleSelectChange}
        options={filterOptions}
      />
    </StyleAnswerFilter>
  );
}
