import "./assets/App.scss"
import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import HomePage from "./pages/HomePage"
import NotFound from "./pages/NotFoundPage"
import GameListPage from "./pages/GameListPage"
import Navigation from "./pages/partials/Navigation"
import GamePage from "./pages/GamePage"

function App() {
  return (
    <>
    <div id="App">
      <Container>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/games" element={<GameListPage />} />
          <Route path="/game/:id" element={<GamePage />} />
          <Route path="*" element={<NotFound /> } /> 
        </Routes>
      </Container>
    </div>
    </>
  )
}

export default App
