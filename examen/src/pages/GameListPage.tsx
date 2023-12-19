import React, { useState, useEffect } from "react";
import { GameDetails } from "../types/Game.types";
import * as GameAPI from "../services/GiantBombAPI.service";
import GameListComponent from "../components/GameListComponent";
import { Container } from "react-bootstrap";

const GameListPage = () => {
  const [games, setGames] = useState<GameDetails | null>(null);

  const getGames = async () => {
    try {
      const data = await GameAPI.getGames();
      console.log("Hello")
      console.log(data)
      setGames(data as GameDetails || null);
    } catch (error) {
      console.log("Hello")
      console.error(error);
    }
  };

  useEffect(() => {
    getGames();
  }, []);

  return (
    <>
      {games && (
        <Container>
          <h1>Game List</h1>
          <GameListComponent games={games} />
        </Container>
      )}
    </>
  );
};

export default GameListPage;