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
  return (
    <div className="row">
      {games.results.map((game) => (
        <Card className="card-box bg-dark text-white" key={game.id}>
          <Link key={game.id} to={`/game/${game.id}`}>
            <Card.Body key={game.id}>
              <Card.Title className="links d-flex justify-content-center">
                {game.name}
              </Card.Title>
              <Card.Text
                className="d-flex justify-content-evenly"
                style={{ fontSize: "10px" }}
              >
                {game.genres.map((genre) => genre.name).join(" ")}
              </Card.Text>
              <Card.Text className="d-flex justify-content-center">
                Release Date: {game.released}
              </Card.Text>
              <Card.Img
                variant="top"
                src={game.background_image}
                className="card-img img-fluid"
              />
            </Card.Body>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default GameListComponent;
