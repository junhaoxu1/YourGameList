import "./assets/App.scss";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFoundPage";
import GameListPage from "./pages/GameListPage";
import TopNavigation from "./pages/partials/TopNavigation";
import GamePage from "./pages/GamePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import ListNavigation from "./pages/partials/ListNavigation";
import UserListPage from "./pages/UserListPage";

function App() {
  return (
    <>
      <div id="App">
        <Container>
          <TopNavigation />
          <ListNavigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/games" element={<GameListPage />} />
            <Route path="/game/:id" element={<GamePage />} />

            <Route path="/user-list" element={<UserListPage />} />

            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </div>
    </>
  );
}

export default App;
