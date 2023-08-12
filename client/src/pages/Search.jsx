import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useKeywordContext } from "../context/SearchKeywordContext";
export default function Search() {
  const { keyword } = useParams();
  const { keywordHandler } = useKeywordContext();
  useEffect(() => {
    keywordHandler(keyword);
    return () => keywordHandler("");
  }, []);
  return <div>검색결과</div>;
}
