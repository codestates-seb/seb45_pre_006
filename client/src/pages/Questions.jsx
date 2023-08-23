import { styled } from "styled-components";
import { useState, useEffect, useRef, useMemo } from "react";


import MainHeadLine from "../components/home/MainHeadLine";
import QuestionsList from "../components/home/QuestionsList";
import Loading from "../components/common/Loading";
import api from "../components/utils/send";

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
  const pageCount = useRef(1);
  const isFirstPageRendered = useRef(false);
  const target = useRef(null);
  const viewPort = useRef(null);

  const questionsFiltered = questionsData.filter((question)=>{ 
    return togle ? question.question_answerCount > 0: question 
  })

  const filterHandler = () => {
    setTogle(!togle);
  };
  const options = {
    root: viewPort.current,
    rootMargin: "0px",
    threshold: 0.6,
  };
  const onIntersect = ([entry], observer) => {
    if (entry.isIntersecting && !isLoading) {
      setIsLoading(true);
      let endpoint = `questions?page=${pageCount.current}`;
      try {
        setTimeout(async () => {
          // endpoint의 페이지 변호변경의 위한 첫번째 메인 페이지 랜더링 유무
          if (isFirstPageRendered.current === false) {
            endpoint = `questions`;
            const responseData = await api.get(endpoint).then((res) => res.data);
            setQuestionsData(responseData.data);
            isFirstPageRendered.current = true;
          } else {
            const responseData = await api.get(endpoint).then((res) => res.data);
            if (responseData.data.length > 0) {
              setQuestionsData((prevData) => [...prevData, ...responseData.data]);
              pageCount.current = pageCount.current + 1;
              setIsLoading(false);
            }
            setIsLoading(false);
          }
        },1000)
        observer.observe(target.current); 
    } catch (error) {
    }
  }
}
useEffect( () => {
  let observer;
  if (target.current ) {
    observer = new IntersectionObserver(onIntersect, options);
    observer.observe(target.current); 
  }
  return () => observer && observer.disconnect();
}, [target]); 

return (
    <QuestionStyle>
      <MainHeadLine 
        filterHandler={filterHandler} 
        togle={togle}
        questionsFiltered={questionsFiltered}>
      </MainHeadLine>
      <QuestionsList 
        togle={togle} 
        questionsFiltered={questionsFiltered}>
      </QuestionsList>
      <div className="infinite-scroll" ref={target}></div>
      {isLoading? <Loading></Loading>: null}
    </QuestionStyle>
);
}
