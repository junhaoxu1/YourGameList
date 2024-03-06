import axios from "axios";
import { GameTitle, GameTitles } from "../types/Game.types";

const API_KEY = import.meta.env.VITE_REACT_GAME_API_KEY;
const BASE_URL = "https://api.rawg.io/api";

export const getGames = async (page = 1) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/games?key=${API_KEY}&page=${page}`
    );
    return response.data as GameTitles;
  } catch (error) {
    console.error("Error fetching games: ", error);
    throw error;
  }
};

export const getGame = async (gameId: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/games/${gameId}?key=${API_KEY}`
    );
    return response.data as GameTitle;
  } catch (error) {
    throw error;
  }
};

export const searchGames = async (query: string): Promise<GameTitles> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/games?key=${API_KEY}&search=${query}`
    );
    return response.data as GameTitles;
  } catch (error) {
    console.error("Error searching games: ", error);
    throw error;
  }
};
