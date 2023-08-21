import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useKeywordContext } from "../context/SearchKeywordContext";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { BlueButton } from "../components/common/Button";
import { BiSearchAlt } from "react-icons/bi";
import QuestionsList from "../components/home/QuestionsList";
import { ListStyle } from "../components/home/QuestionsList";

const SearchHeadLine = styled.div`
  width: 100%;
  margin-top: 26px;
  height: 82px;
  background-color: var(--white);
  border-bottom: 1px solid var(--border);
  .search-headline-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
  }
  div > h1 {
    max-width: 100%;
    height: 35px;
    font-size: 27px;
    margin-left: 25px;
  }
  div > button {
    padding: 0px;
    height: 37.8px;
    width: 103px;
    margin-right: 48px;
    font-size: 13px;
    font-weight: bold;
  }
  .counter-container {
    width: 1100px;
    height: 30px;
    margin-right: 24px;
    margin-bottom: 12px;
  }
  .counter-container > h3 {
    margin-left: 25px;
    font-size: 17px;
    font-weight: 500;
  }
  .result-container {
    width: 1100px;
    height: 281px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 24px 24px 24px;
  }
  .search-icon {
    width: 96px;
    height: 96px;
    color: var(--black-400);
  }
  .result-container > h2 {
    margin-top: 12px;
    margin-bottom: 13px;
    font-size: 17px;
    font-weight: 600;
  }
  .keyword-wrap {
    font-size: 17px;
    font-weight: bolder;
  }
  .result-container > h3 {
    font-size: 13px;
  }
  .result-filtered-container {
    width: 100%;
    max-width: 1100px;
  }
`;

const questions = {
  questions: [
    {
      question_id: 1,
      question_title:
        "IN THE ABOVE EXAMPLE STRICT MODE CHEC SDAKJHIWHIWUDHW KS WILL NOTE BE RUN AGAIST THE HAEADER CHECKS WILL NOTE BE RUN AGAIST THE HAEADER CHECKS WILL NOTE BE RUN AGAIST THE HAEADER AGAIST SDAKJHIWHIWUDHW KS WILL NOTE BE RUN AGAIST THE HAEADER CHECKS WILL NOTE BE RUN AGAIST THE HAEADER CHECKS WILL NOTE BE RUN AGAIST THE HAEADER AGAIST",
      question_content:
        "i change the version of i change the version of i change the version of i change the version of i change the version of i change the version of mode checks will not be run against strict mode checks mode checks will not be run against strict mode checks",
      question_viewcount: 128,
      created_at: "2023-08-10T10:00:00",
      updated_at: "2023-08-10T12:30:00",
      user_name: "user123",
      question_answercount: 0,
    },
    {
      question_id: 2,
      question_title:
        "Linux while i change the version of init, selinux shows i change the version of init, selinux shows i change the version of init, selinux shows Linux while i change the version of init, selinux shows i change the version ofm Linux while i change the version of init, selinux shows i change the version of init, selinux shows i change the version of init, selinux shows Linux while i change the version of init, selinux shows i change the version ofm ",
      question_content:
        "the version of , whi  whie i change the version of init, selinux shows i c version of init, selinux shows i chhange the version ofm Linux while i change the version of init, selinux shows i change the version of init, selinux shows i change the version of init, selinux shows Linux while i change the version of init, selinux shows i change the versio i change the version of init, selinux shows i change the version ofm Linux while i change the version of init, selinux shows i change the version of init, selinux shows i change the version of init, selinux shows Linux while i change the version of init, selinux shows i change the version ofn ofm",
      question_viewcount: 128,
      created_at: "2023-08-10T10:00:00",
      updated_at: "2023-08-10T12:30:00",
      user_name: "user1asdfa23",
      question_answercount: 45,
    },
    {
      question_id: 3,
      question_title: "Context",
      question_content:
        "In the above example, strict mode checks will not be run against the Header and Footer components. However, ComponentOne and ComponentTwo, as well as all of their descendants, will have the checks.",
      question_viewcount: 128,
      created_at: "2023-08-10T10:00:00",
      updated_at: "2023-08-10T12:30:00",
      user_name: "user1232323",
      question_answercount: 25,
    },
  ],
};

export default function Search() {
  const currentPath = useNavigate();
  const { keyword } = useParams();
  const { keywordHandler } = useKeywordContext();
  const [resultCount, setResultCount] = useState();
  const testData = JSON.parse(JSON.stringify(questions)); //

  useEffect(() => {
    keywordHandler(keyword);
    return () => keywordHandler("");
  }, []);

  const askBtnHandler = () => {
    currentPath("/ask");
  };

  return (
    <SearchHeadLine>
      <div className="search-headline-container">
        <h1>Search Results</h1>
        <BlueButton
          onClick={() => {
            askBtnHandler();
          }}
        >
          Ask Question
        </BlueButton>
      </div>
      <div className="counter-container">
        <h3>1245124 questions</h3>
      </div>

      {/* <div className="result-container">
          <img src="/images/searchImg.png" alt="searchIcon" className="search-icon" ></img>
          <h2>We couldn't find anything for <span className="keyword-wrap">{'asdfhklh'}</span></h2>
          <h3 >Try different or less specific keywords.</h3>
        </div> */}

      <QuestionsList questionsData={testData.questions}></QuestionsList>
    </SearchHeadLine>
  );
}
