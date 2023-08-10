import { Routes, Route, useLocation } from "react-router-dom";
import Question from "./pages/Questions";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import QuestionWrite from "./pages/QuentionWrite";
import QuestionDetail from "./pages/QuestionDetail";
import Search from "./pages/Search";
import Signup from "./pages/Signup";
import Users from "./pages/Users";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import { styled } from "styled-components";
import SideBar from "./components/sidebar/SideBar";
import Footer from "./components/footer/Footer";

const StyleApp = styled.div``;
const sidebarPaths = ["profile", "users", "search", "questions", ""];
const footerPaths = ["profile", "users", "search", "questions", "ask", ""];

function App() {
  const path = useLocation().pathname.split("/")[1];
  const isSidebar = sidebarPaths.includes(path);
  const isFooter = footerPaths.includes(path);

  return (
    <StyleApp>
      {isSidebar && <SideBar />}
      <Routes>
        <Route path={"/"} element={<Question />} />
        <Route path={"/users"} element={<Users />} />
        <Route path={"/search/:keyword"} element={<Search />} />
        <Route path={"/users/:userId"} element={<Profile />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/ask"} element={<QuestionWrite />} />
        <Route path={"/questions/:questionId"} element={<QuestionDetail />} />
        <Route path={"/reset-password"} element={<ResetPassword />} />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
      {isFooter && <Footer />}
    </StyleApp>
  );
}

export default App;
