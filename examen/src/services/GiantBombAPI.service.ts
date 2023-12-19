import axios from "axios";

const API_KEY = import.meta.env.VITE_REACT_GAME_API_KEY;
const BASE_URL = "https://api.rawg.io/api";


export const getGames = async () => {
  const apiUrl = `${BASE_URL}/games?key=${API_KEY}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
};