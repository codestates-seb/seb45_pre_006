import React from "react";
import { styled } from "styled-components";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import MainHeadLine from "../components/home/MainHeadLine";
import QuestionsList from "../components/home/QuestionsList";
import Loading from "../components/common/Loading";

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
      question_answerCount: 0,
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
      question_answerCount: 45,
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
      question_answerCount: 25,
    },
    {
      question_id: 4,
      question_title: "Context",
      question_content:
        "In the above example, strict mode checks will not be run against the Header and Footer components. However, ComponentOne and ComponentTwo, as well as all of their descendants, will have the checks.",
      question_viewcount: 128,
      created_at: "2023-08-10T10:00:00",
      updated_at: "2023-08-10T12:30:00",
      user_name: "user1232323",
      question_answerCount: 0,
    },
    {
      question_id: 5,
      question_title: "Contasdfaext",
      question_content:
        "In the above example, strict mode checks will not be run against the Header and Footer components. However, ComponentOne and ComponentTwo, as well as all of their descendants, will have the checks.",
      question_viewcount: 128,
      created_at: "2023-08-10T10:00:00",
      updated_at: "2023-08-10T12:30:00",
      user_name: "user1232323",
      question_answerCount: 0,
    },
    {
      question_id: 6,
      question_title: "Context",
      question_content:
        " will not be run against the Header and Footer components. However, ComponentOne and ComponentTwo, as well as all of their descendants, will have the checks.",
      question_viewcount: 128,
      created_at: "2023-08-10T10:00:00",
      updated_at: "2023-08-10T12:30:00",
      user_name: "user1232323",
      question_answerCount: 25,
    },
    {
      question_id: 7,
      question_title: "Context",
      question_content:
        "mode checks will not be run against the Header and Footer components. However, ComponentOne and ComponentTwo, as well as all of their descendants, will have the checks.",
      question_viewcount: 128,
      created_at: "2023-08-10T10:00:00",
      updated_at: "2023-08-10T12:30:00",
      user_name: "user1232323",
      question_answerCount: 0,
    },
    {
      question_id: 7,
      question_title: "Context",
      question_content:
        "mode checks will not be run against the Header and Footer components. However, ComponentOne and ComponentTwo, as well as all of their descendants, will have the checks.",
      question_viewcount: 128,
      created_at: "2023-08-10T10:00:00",
      updated_at: "2023-08-10T12:30:00",
      user_name: "user1232323",
      question_answerCount: 25,
    },
    {
      question_id: 7,
      question_title: "Context",
      question_content:
        "mode checks will not be run against the Header and Footer components. However, ComponentOne and ComponentTwo, as well as all of their descendants, will have the checks.",
      question_viewcount: 128,
      created_at: "2023-08-10T10:00:00",
      updated_at: "2023-08-10T12:30:00",
      user_name: "user1232323",
      question_answerCount: 25,
    },
    {
      question_id: 7,
      question_title: "Context",
      question_content:
        "mode checks will not be run against the Header and Footer components. However, ComponentOne and ComponentTwo, as well as all of their descendants, will have the checks.",
      question_viewcount: 128,
      created_at: "2023-08-10T10:00:00",
      updated_at: "2023-08-10T12:30:00",
      user_name: "user1232323",
      question_answerCount: 25,
    },
  ],
};

const QuestionStyle = styled.main`
  width: 100%;
  margin-top: 26px;
  position: relative;
  .infinite-scroll {
    width: 1100px;
    height: 50px;
    bottom: -250px;
    position: relative;
  }
`;

export default function Question() {
  const [togle, setTogle] = useState(false);
  const testData = JSON.parse(JSON.stringify(questions)); // MockUp data
  const [questionsData, setQuestionsData] = useState(testData.questions);

  const answerFiltered = questionsData.filter((question) => {
    return togle ? question.question_answerCount > 0 : question;
  });
  const filterHandler = () => {
    setTogle(!togle);
  };
  //GET 요청
  // const url = 'https://c285-175-125-163-108.ngrok-free.app/questions';
  // useEffect( ()=>{
  //   axios.get(url,{
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'ngrok-skip-browser-warning': '69420',
  //     },
  //   })
  //     .then((res)=>{console.log(res.data.data)
  //       setQuestionsData(res.data.data)
  //     })
  //     .catch((Error)=>{console.log(Error)})
  //     .then(()=>{
  //       postHandler()
  //     })
  // },[])

  // //POST 요청
  // const postHandler = async ()=>{
  //   const data = { hasAnswer: false};
  //   await axios.post(`https://4608-175-125-163-108.ngrok-free.app/questions/filter?hasAnswer=${data.hasAnswer}`,{
  //     method: 'post',
  //     url: url,
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'ngrok-skip-browser-warning': '69420',
  //     },
  //     data: {
  //       'hasAnswer': 'false',
  //       'lastQuestionId': '10',
  //     },
  //   })
  //   .then((res)=>{console.log(res.data) })
  //   .catch((Error)=>{console.log(Error)})
  // }

  // infiniteScroll
  const [isLoading, setIsLoading] = useState(false);
  const target = useRef(null);
  const viewPort = useRef();

  const options = {
    root: viewPort.current,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const onIntersect = ([entry], observer) => {
    if (entry.isIntersecting && !isLoading) {
      setIsLoading(true);
      axios.get("http://cozshopping.codestates-seb.link/api/v1/products?count=10").then((res) => {
        const newData =
          res.data &&
          res.data.map((el) => {
            return { ...el, isBookMarked: false };
          });
        setQuestionsData(questionsData);
      });
      setIsLoading(false);
      observer.observe(target.current);
    }
  };

  useEffect(() => {
    let observer;
    if (target.current) {
      // callback 함수, option
      observer = new IntersectionObserver(onIntersect, options);
      observer.observe(target.current); // 타겟 엘리먼트 지정
    }
    return () => observer && observer.disconnect(); //다수의 엘리먼트를 관찰하고 있을떄, 이에대한 모든 관찰을 멈추고 싶을때 사용
  }, [target]);

  return (
    <QuestionStyle>
      <MainHeadLine filterHandler={filterHandler} togle={togle}></MainHeadLine>
      <QuestionsList
        questionsData={questionsData}
        togle={togle}
        answerFiltered={answerFiltered}
      ></QuestionsList>
      <div className="infinite-scroll" ref={target}></div>
      <Loading></Loading>
    </QuestionStyle>
  );
}
