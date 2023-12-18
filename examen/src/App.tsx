import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import HomePage from "./pages/HomePage"
import NotFound from "./pages/NotFoundPage"

function App() {
  return (
    <>
    <div id="App">
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFound /> } /> 
        </Routes>
      </Container>
    </div>
    </>
  )
}

export default App
