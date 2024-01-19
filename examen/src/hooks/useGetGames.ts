import { where } from "firebase/firestore";
import { gamesCol } from "../services/firebase";
import { GameTitle } from "../types/Game.types";
import useStreamCollection from "./useStreamCollection";

const useGetGames = (uid = "") => {
  return useStreamCollection<GameTitle>(gamesCol, where("uid", "==", uid));
};

export default useGetGames;
