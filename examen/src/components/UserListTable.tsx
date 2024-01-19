import { Image, Table, Button, Form } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import useGetGames from "../hooks/useGetGames";
import { GameTitle } from "../types/Game.types";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

interface ListTableProps {
  onDeleteGame: (gameId: string) => Promise<void>;
  onEditScore: (data: GameTitle) => Promise<void>;
}

const UserListTable = ({ onDeleteGame, onEditScore }: ListTableProps) => {
  const { currentUser } = useAuth();
  const { data: games } = useGetGames(currentUser?.uid);

  const [selectedScores, setSelectedScores] = useState<Record<string, string>>(
    {}
  );

  const handleScoreChange = (
    gameId: string,
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setSelectedScores((prevScores) => ({ ...prevScores, [gameId]: value }));
  };

  const handleEditScore = (game: GameTitle) => {
    const updatedScore = selectedScores[game._id] || "No Score";

    onEditScore({
      ...game,
      score: updatedScore,
    });
  };

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortGamesByName = () => {
    if (games) {
      const sortedGames = [...games];
      sortedGames.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (sortOrder === "asc") {
          return nameA.localeCompare(nameB);
        } else {
          return nameB.localeCompare(nameA);
        }
      });

      return sortedGames;
    }

    return [];
  };

  const handleSortByName = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <Table variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Cover</th>
          <th>
            Name
            <Button
              variant="link"
              onClick={handleSortByName}
              style={{ color: "white" }}
            >
              {sortOrder === "asc" ? "▲" : "▼"}
            </Button>
          </th>
          <th>Score</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      {sortGamesByName() &&
        sortGamesByName().map((game, index) => (
          <tbody key={game.name}>
            <tr>
              <td>{index + 1}</td>
              <td>
                {game.background_image && (
                  <Image
                    src={game.background_image}
                    alt={game.name}
                    fluid
                    style={{ width: "150px", height: "auto" }}
                  />
                )}
              </td>
              <td>
                <Link to={`/game/${game.id}`}>{game.name}</Link>
              </td>
              <td>
                {game.score || 0}
                <Form.Select
                  onChange={(e) => handleScoreChange(game._id, e)}
                  value={selectedScores[game._id] || "No Score"}
                  className=""
                >
                  <option value="No Score">Your Score</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Form.Select>
              </td>
              <td>
                <Button
                  variant="dark"
                  className="border-light"
                  onClick={() => handleEditScore(game)}
                  disabled={
                    selectedScores[game._id] === "No Score" ||
                    !selectedScores[game._id]
                  }
                >
                  Update Score
                </Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => onDeleteGame(game._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          </tbody>
        ))}
    </Table>
  );
};

export default UserListTable;
