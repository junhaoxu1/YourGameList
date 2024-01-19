import UserListTable from "../components/UserListTable";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { gamesCol } from "../services/firebase";
import { GameTitle } from "../types/Game.types";

const UserListPage = () => {
  const deleteGame = async (gameId: string) => {
    try {
      const docRef = doc(gamesCol, gameId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting game:", error);
    }
  };

  const editScore = async (data: GameTitle) => {
    const docRef = doc(gamesCol, data._id);

    const gameData = {
      ...data,
    };

    await updateDoc(docRef, gameData);
  };

  return (
    <>
      <UserListTable onDeleteGame={deleteGame} onEditScore={editScore} />
    </>
  );
};

export default UserListPage;
