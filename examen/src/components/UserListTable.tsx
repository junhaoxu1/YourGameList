import { Image, Table, Button, Form } from "react-bootstrap"
import useAuth from '../hooks/useAuth'
import useGetGames from '../hooks/useGetGames'
import { GameTitle } from "../types/Game.types"
import React, { ChangeEvent, useState } from "react"

interface ListTableProps {
    onDeleteGame: (gameId: string) => Promise<void> 
    onEditScore: (data: GameTitle) => Promise<void>
}

const UserListTable = ({ onDeleteGame, onEditScore }: ListTableProps) => {
    const { currentUser } = useAuth()
    const {
        data: games,
    } = useGetGames(currentUser?.uid)

    const [selectedScores, setSelectedScores] = useState<Record<string, string>>({});

    const handleScoreChange = (gameId: string, event: ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;
      setSelectedScores((prevScores) => ({ ...prevScores, [gameId]: value }));
    };
  
    const handleEditScore = (game: GameTitle) => {
      const updatedScore = selectedScores[game._id] || 'No Score';
  
      onEditScore({
        ...game,
        score: updatedScore,
      });
    };
  

  return (
    <Table> 
        <thead>
            <tr>
                <th>#</th>
                <th>Cover</th>
                <th>Name</th>
                <th>Score</th>
            </tr>
        </thead>
        {games && games.map((game, index) => (
             <tbody key={game.name}>
             <tr>
                <td>{index + 1}</td>
                <td>
                {game.background_image && 
                <Image 
                    src={game.background_image} 
                    alt={game.name} 
                    fluid 
                    style={{ width: '150px', height: 'auto' }}
                    />}
                </td>
                <td>{game.name}</td>
                <td>
                    {game.score}
                <Form.Select
                  onChange={(e) => handleScoreChange(game._id, e)}
                  value={selectedScores[game._id] || 'No Score'}
                  className="d-inline-block mx-2"
                >
                  <option value="No Score">Your Score</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Form.Select>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleEditScore(game)}
                  disabled={selectedScores[game._id] === "No Score" || !selectedScores[game._id]}
                >
                  Update Score
                </Button>
              </td>
                <td><Button variant="danger" onClick={() => onDeleteGame(game._id)}>Remove</Button></td>
             </tr>
         </tbody>
        ))}
    </Table>
  )
}

export default UserListTable