import axios from "axios";
import { GameTitles } from "../types/Game.types";

const API_KEY = import.meta.env.VITE_REACT_GAME_API_KEY;
const BASE_URL = "https://api.rawg.io/api";


export const getGames = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/games?key=${API_KEY}&page=${page}`);
    return response.data as GameTitles;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
};