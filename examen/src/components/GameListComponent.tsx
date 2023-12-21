import { GameTitles } from "../types/Game.types";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
interface GameListProps {
  games: GameTitles;
}

const GameListComponent = ({ games }: GameListProps) => {
  if (!games) {
    return;
  }

  console.log(games.results)
  return (
    <div className="row">
      {games.results.map((game) => (
        <Card
          style={{ width: "19rem", marginLeft: "10px", marginTop: "10px" }}
          key={game.id}
        >
          <Card.Body key={game.id}>
            <Link key={game.id} className="link-dark" to={`/game/${game.id}`}>
              <Card.Title className="d-flex justify-content-center">{game.name}</Card.Title>
            </Link>
            <Card.Text className="d-flex justify-content-evenly" style={{fontSize: "10px"}}>{game.genres.map((genre) => genre.name)}</Card.Text>
            <Card.Text className="d-flex justify-content-center">Release Date: {game.released}</Card.Text>
          <Card.Img
            variant="top"
            src={game.background_image}
            className="img-fluid"
            style={{ width: "60%", height: "100px" }}
          />
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default GameListComponent;
