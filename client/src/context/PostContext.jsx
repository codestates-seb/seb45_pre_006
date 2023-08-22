import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Context 생성
const PostContext = createContext();

// Context를 사용하여 Provider 컴포넌트를 만들기
export function PostProvider({ children }) {
  const [post, setPost] = useState(null);
  useEffect(() => {
    axios
      .get(process.env.PUBLIC_URL + "/data/post.json")
      .then((response) => setPost(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <PostContext.Provider value={{ post, setPost }}>
      {children}
    </PostContext.Provider>
  );
}

// 커스텀 훅 생성
export function usePostContext() {
  return useContext(PostContext);
}
