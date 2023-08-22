import { styled } from "styled-components";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import MainHeadLine from "../components/home/MainHeadLine";
import QuestionsList from "../components/home/QuestionsList";
import Loading from "../components/common/Loading";

const QuestionStyle = styled.main`
  margin-top: 26px;
  position: relative;
  .infinite-scroll {
    width: 100%;
    height: 50px;
    bottom: 0px;
  }
`;
export default function Question() {
  const [togle, setTogle] = useState(false);
  const [questionsData, setQuestionsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const target = useRef();
  const viewPort = useRef(null);
  //무한스크롤 요청 URL: questions:?page=1
  //받아온 데이터를 answerCount의 존재여부로 필터링
  const questionsFiltered = questionsData.filter((question) => {
    return togle ? question.question_answerCount > 0 : question;
  });

  const filterHandler = () => {
    setTogle(!togle);
  };

  const options = {
    root: viewPort.current,
    rootMargin: "0px",
    threshold: 0.6,
  };

  console.log(questionsData);

  const onIntersect = ([entry], observer) => {
    if (entry.isIntersecting && !isLoading) {
      setIsLoading(true);
      try {
        setTimeout(() => {
          axios
            .get("http://13.125.37.74:8080/questions", {
              headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
              },
            })
            .then((res) => {
              const newData =
                res.data.data &&
                res.data.data.map((question) => {
                  return { ...question };
                });
              setQuestionsData((prevData) => [...prevData, ...newData]);
            });
          setIsLoading(false);
          observer.observe(target.current);
        }, 1000);
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  };

  useEffect(() => {
    let observer;
    if (target.current) {
      // callback 함수, option
      observer = new IntersectionObserver(onIntersect, options);
      observer.observe(target.current); // 타겟 요소를 지정
    }
    return () => observer && observer.disconnect(); //다수의 엘리먼트를 관찰하고 있을떄, 이에대한 모든 관찰을 멈추고 싶을때 사용
  }, [target]);

  return (
    <QuestionStyle>
      <MainHeadLine
        filterHandler={filterHandler}
        togle={togle}
        questionsFiltered={questionsFiltered}
      ></MainHeadLine>
      <QuestionsList
        togle={togle}
        questionsFiltered={questionsFiltered}
      ></QuestionsList>
      <div className="infinite-scroll" ref={target} defer></div>
      {isLoading ? <Loading></Loading> : null}
    </QuestionStyle>
  );
}
