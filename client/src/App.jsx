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
import Sidebar from "./components/sidebar/Sidebar";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
const StyleApp = styled.div`
  width: var(--inner);
  min-height: 100vh;
  margin: 0 auto;
  .center {
    margin-top: 56px;
    display: flex;
    min-height: 100vh;
  }
`;
const sidebarPaths = ["profile", "users", "search", "questions", ""];
const footerPaths = ["profile", "users", "search", "questions", "ask", ""];

function App() {
  const path = useLocation().pathname.split("/")[1];
  const isSidebar = sidebarPaths.includes(path);
  const isFooter = footerPaths.includes(path);

  return (
    <StyleApp>
      <Header />
      <section className="center">
        {isSidebar && <Sidebar />}
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
      </section>
      {isFooter && <Footer />}
    </StyleApp>
  );
}

export default App;
