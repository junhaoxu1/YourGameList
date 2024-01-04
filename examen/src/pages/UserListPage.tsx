import UserListTable from '../components/UserListTable'
import { doc, deleteDoc } from "firebase/firestore"
import { gamesCol } from '../services/firebase'
import { useParams } from 'react-router-dom'
import useGetGames from '../hooks/useGetGames'


const UserListPage = () => {

  const deleteGame = async (gameId: string) => {
    console.log(gameId)
    try {
        const docRef = doc(gamesCol, gameId);
        await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting game:", error);
    }
  };

  return (
    <>
        <UserListTable onDeleteGame={deleteGame}/>
    </>
  )
}

export default UserListPage