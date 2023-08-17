import { createContext, useContext, useState } from "react";

const KeywordContext = createContext();

// Search 페이지의 키워드를 SearchForm과 공유하기 위한 Context
export function SearchKeywordProvider({ children }) {
  const [keyword, setKeyword] = useState("");
  const keywordHandler = (str) => {
    setKeyword(str);
  };
  return (
    <KeywordContext.Provider value={{ keyword, keywordHandler }}>
      {children}
    </KeywordContext.Provider>
  );
}

export function useKeywordContext() {
  return useContext(KeywordContext);
}
