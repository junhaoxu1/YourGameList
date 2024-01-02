import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import { Link } from "react-router-dom"


const ListNavigation = () => {

	return (
		<Navbar>
			<Container className="border border-dark">
				<Navbar.Brand 
                    style={{ fontSize: "20px"}} 
                    as={Link} 
                    to="/games">
					    Games
				</Navbar.Brand>
			</Container>
		</Navbar>
	)
}

export default ListNavigation
