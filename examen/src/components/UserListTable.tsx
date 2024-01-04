import { Image, Table, Button } from "react-bootstrap"
import useAuth from '../hooks/useAuth'
import useGetGames from '../hooks/useGetGames'

interface ListTableProps {
    onDeleteGame: (gameId: string) => void 
}

const UserListTable = ({ onDeleteGame }: ListTableProps) => {
    const { currentUser } = useAuth()
    const {
        data: games,
    } = useGetGames(currentUser?.uid)
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
                <td>{game.score || 0}</td>
                <td><Button variant="danger" onClick={() => onDeleteGame(game._id)}>Remove</Button></td>
             </tr>
         </tbody>
        ))}
    </Table>
  )
}

export default UserListTable