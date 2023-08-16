import React from "react";
import { styled } from "styled-components";
import { useState, useEffect } from "react";
import axios from 'axios'

import MainHeadLine from "../components/home/MainHeadLine";
import QuestionsList from "../components/home/QuestionsList";




const questions = { "questions":[
  {
      "question_id": 1,
      "question_title": "IN THE ABOVE EXAMPLE STRICT MODE CHEC SDAKJHIWHIWUDHW KS WILL NOTE BE RUN AGAIST THE HAEADER CHECKS WILL NOTE BE RUN AGAIST THE HAEADER CHECKS WILL NOTE BE RUN AGAIST THE HAEADER AGAIST SDAKJHIWHIWUDHW KS WILL NOTE BE RUN AGAIST THE HAEADER CHECKS WILL NOTE BE RUN AGAIST THE HAEADER CHECKS WILL NOTE BE RUN AGAIST THE HAEADER AGAIST",
      "question_content": "i change the version of i change the version of i change the version of i change the version of i change the version of i change the version of mode checks will not be run against strict mode checks mode checks will not be run against strict mode checks",
      "question_viewcount": 128,
      "created_at": "2023-08-10T10:00:00",
      "updated_at": "2023-08-10T12:30:00",
      "user_name": "user123",
      "question_answercount": 0
  },
  {
      "question_id": 2,
      "question_title": "Linux while i change the version of init, selinux shows i change the version of init, selinux shows i change the version of init, selinux shows Linux while i change the version of init, selinux shows i change the version ofm Linux while i change the version of init, selinux shows i change the version of init, selinux shows i change the version of init, selinux shows Linux while i change the version of init, selinux shows i change the version ofm ",
      "question_content": "the version of , whi  whie i change the version of init, selinux shows i c version of init, selinux shows i chhange the version ofm Linux while i change the version of init, selinux shows i change the version of init, selinux shows i change the version of init, selinux shows Linux while i change the version of init, selinux shows i change the versio i change the version of init, selinux shows i change the version ofm Linux while i change the version of init, selinux shows i change the version of init, selinux shows i change the version of init, selinux shows Linux while i change the version of init, selinux shows i change the version ofn ofm",
      "question_viewcount": 128,
      "created_at": "2023-08-10T10:00:00",
      "updated_at": "2023-08-10T12:30:00",
      "user_name": "user1asdfa23",
      "question_answercount": 45
  },
  {
      "question_id": 3,
      "question_title": "Context",
      "question_content": "In the above example, strict mode checks will not be run against the Header and Footer components. However, ComponentOne and ComponentTwo, as well as all of their descendants, will have the checks.",
      "question_viewcount": 128,
      "created_at": "2023-08-10T10:00:00",
      "updated_at": "2023-08-10T12:30:00",
      "user_name": "user1232323",
      "question_answercount": 25
  }
]
}
 

const QuestionStyle = styled.main `
  width: 100%;
  max-width: 1100px;
  margin-top: 26px;
`

export default function Question() {
  const [togle,setTogle] = useState(false);
  const testData = JSON.parse(JSON.stringify(questions))
  const [questionsData, setQuestionsData] = useState(testData);
  // 데이터를 여기서 받아 props로 넘겨줄려고합니다.

  const filterHandler = () =>{
    setTogle(!togle)
  }
  return (
    <QuestionStyle>
      <MainHeadLine filterHandler={filterHandler} togle={togle}></MainHeadLine>
      <QuestionsList questionsData={questionsData.questions} ></QuestionsList>
    </QuestionStyle>
  )
}
