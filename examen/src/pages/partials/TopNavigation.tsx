import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import { NavLink, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const TopNavigation = () => {
  const { currentUser, userEmail } = useAuth();

  return (
    <Navbar data-bs-theme="dark">
      <Container>
        <Navbar.Brand className="top-nav" as={Link} to="/">
          YGL
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="top-nav" id="basic-navbar-nav">
          <Nav className="top-nav ms-auto">
            {currentUser ? (
              <>
                <NavDropdown title={userEmail}>
                  <NavDropdown.Item as={NavLink} to="/user-list">
                    My Game List
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/logout">
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link className="top-nav" as={NavLink} end to="/login">
                  Login
                </Nav.Link>
                <Nav.Link className="top-nav" as={NavLink} end to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNavigation;
