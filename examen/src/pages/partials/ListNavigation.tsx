import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import { Link } from "react-router-dom"


const ListNavigation = () => {

	return (
		<Navbar>
			<Container className="border border-light">
				<Navbar.Brand 
					className="nav-brand"
                    as={Link} 
                    to="/games">
					    Games
				</Navbar.Brand>
			</Container>
		</Navbar>
	)
}

export default ListNavigation
