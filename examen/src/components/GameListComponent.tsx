import { GameDetails } from "../types/Game.types";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

interface GameListProps {
  games: GameDetails;

}

const GameListComponent = ({ games }: GameListProps) => {

  if (!games) {
    return;
  }
    return (
      <div className="row">
        {games.results.map((game) => (
          <Card 
          style={{ width: "20rem", marginLeft: "10px", marginTop: "10px"}}
          key={game.id}
          >
          <Card.Img variant="top" src={game.background_image} />
          <Card.Body key={game.id}>
            <Card.Title>{game.name}</Card.Title>
            <Card.Text>{game.release}</Card.Text>
            <Button variant="primary">Read More...</Button>
          </Card.Body>
          </Card>
        ))}
      </div>
      // <Row>
      //   {games.results.map((game) => (
      //     <Col key={game.id}>
      //       <Link
      //         className="link-dark"
      //         key={game.id}
      //         to={`/game/${game.id}`}
      //       >
      //         {game.background_image ? (
      //           <img  
      //             className="border border-dark"
      //             src={game.background_image}
      //             alt={`${game.name}'s profile`}
      //           />
      //         ): (
      //           <img src="" alt="placeholder"/>
      //         )}
      //       </Link>
      //       <h1>{game.name}</h1>
      //     </Col>
      //   ))}
      // </Row>
    );
};

export default GameListComponent;
