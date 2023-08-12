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
import { SearchKeywordProvider } from "./context/SearchKeywordContext";

const StyleApp = styled.div`
  min-height: 100vh;
  background-color: ${(props) => (props.$background ? "var(--app-back-color)" : "")};
  .center {
    width: var(--inner);
    margin: 0 auto;
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
    <StyleApp $background={!isSidebar}>
      <SearchKeywordProvider>
        <Header />
        <section className="center">
          {isSidebar && <Sidebar />}
          <Routes>
            <Route path={"/"} element={<Question />} />
            <Route path={"/users"} element={<Users />} />
            <Route path={"/search/:keyword"} element={<Search />} />
            <Route path={"/users/:userId"} element={<Profile />} />
            <Route path={"/questions/:questionId"} element={<QuestionDetail />} />
            <Route path={"/ask"} element={<QuestionWrite />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/signup"} element={<Signup />} />
            <Route path={"/reset-password"} element={<ResetPassword />} />
            <Route path={"*"} element={<NotFound />} />
          </Routes>
        </section>
      </SearchKeywordProvider>
      {isFooter && <Footer />}
    </StyleApp>
  );
}

export default App;
