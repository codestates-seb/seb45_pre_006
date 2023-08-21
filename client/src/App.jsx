import { Routes, Route, useLocation } from "react-router-dom";
import Question from "./pages/Questions";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import QuestionWrite from "./pages/QuentionWrite";
import QuestionDetail from "./pages/QuestionDetail";
import Search from "./pages/Search";
import Signup from "./pages/Signup";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";
import { styled } from "styled-components";
import Sidebar from "./components/sidebar/Sidebar";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { SearchKeywordProvider } from "./context/SearchKeywordContext";
import Edit from "./pages/Edit";
import ProtectedRoute from "./pages/ProtectedRoute";

const StyleApp = styled.div`
  background-color: ${(props) =>
    props.$background ? "var(--app-back-color)" : ""};
  .center {
    width: var(--inner);
    margin: 0 auto;
    margin-top: 56px;
    display: flex;
    min-height: calc(100vh - 56px);
    position: relative;
  }
`;

const sidebarPaths = ["profile", "users", "search", "questions", "answers", ""];
const footerPaths = ["profile", "users", "search", "questions", "ask", ""];
function App() {
  const path = useLocation().pathname.split("/")[1];
  const isSidebar = sidebarPaths.includes(path);
  const isFooter = footerPaths.includes(path);

  return (
    <StyleApp $background={!isSidebar}>
      <SearchKeywordProvider>
        <Header />
        <div className="center">
          {isSidebar && <Sidebar />}
          <Routes>
            <Route path={"/"} element={<Question />} />
            <Route path={"/users"} element={<Users />} />
            <Route path={"/search/:keyword"} element={<Search />} />
            <Route path="/users/:profileId/*" element={<Profile />} />
            <Route
              path={"/questions/:question_id"}
              element={<QuestionDetail />}
            />
            <Route
              path={"/questions/:question_id/edit"}
              element={
                <ProtectedRoute isAdmin requireLogin>
                  <Edit />
                </ProtectedRoute>
              }
            />
            <Route
              path={"/answers/:answer_id/edit"}
              element={
                <ProtectedRoute isAdmin requireLogin>
                  <Edit />
                </ProtectedRoute>
              }
            />
            <Route
              path={"/ask"}
              element={
                <ProtectedRoute requireLogin>
                  <QuestionWrite />
                </ProtectedRoute>
              }
            />
            <Route
              path={"/login"}
              element={
                <ProtectedRoute requireUnLogin>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path={"/signup"}
              element={
                <ProtectedRoute requireUnLogin>
                  <Signup />
                </ProtectedRoute>
              }
            />

            <Route path={"*"} element={<NotFound />} />
          </Routes>
        </div>
      </SearchKeywordProvider>
      {isFooter && <Footer />}
    </StyleApp>
  );
}

export default App;
