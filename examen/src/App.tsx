import "./assets/App.scss"
import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import HomePage from "./pages/HomePage"
import NotFound from "./pages/NotFoundPage"
import GameListPage from "./pages/GameListPage"

function App() {
  return (
    <>
    <div id="App">
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/games" element={<GameListPage />} />
          <Route path="*" element={<NotFound /> } /> 
        </Routes>
      </Container>
    </div>
    </>
  )
}

export default App
