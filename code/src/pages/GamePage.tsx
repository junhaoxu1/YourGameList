import { useState, useEffect } from "react";
import * as GameAPI from "../services/GameAPI.service.";
import { useParams } from "react-router-dom";
import { GameTitle } from "../types/Game.types";
import Alert from "react-bootstrap/Alert";
import GameDetailsComponent from "../components/GameDetailsComponent";
import { gamesCol, reviewsCol } from "../services/firebase";
import { doc, setDoc } from "firebase/firestore";
import useAuth from "../hooks/useAuth";
import useGetGames from "../hooks/useGetGames";
import useGetReviews from "../hooks/useGetReviews";
import { Review } from "../types/Review.types";

const GamePage = () => {
  const [game, setGame] = useState<GameTitle | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { currentUser } = useAuth();
  const gameId = Number(id);

  const { data: games } = useGetGames(currentUser?.uid);

  const { data: reviews } = useGetReviews(gameId);

  const validGame = async (id: number) => {
    try {
      await GameAPI.getGame(id);
      return true;
    } catch (error) {
      return false;
    }
  };

  const getGame = async (id: number) => {
    setError(null);
    setLoading(true);

    try {
      const gameData = await GameAPI.getGame(id);
      setGame(gameData || null);
    } catch (error) {
      console.error("Failed to fetch: ", error);
      if (error instanceof Error) setError(error.message);
    }
    setLoading(false);
  };

  const fetchGame = async () => {
    const gameExist = await validGame(gameId);

    try {
      if (typeof gameId !== "number" || !gameExist) {
        setError("This Game Does Not Exist!");
        setLoading(false);
      } else {
        await getGame(gameId);
      }
    } catch (error) {
      console.error("Failed to fetch: ", error);
      setError("Game does not exist!");
      setLoading(false);
      return;
    }
  };

  const addGameToList = async (data: GameTitle) => {
    const existingGame = games?.some((game) => game.name === data.name);
    if (existingGame) {
      return;
    } else {
      const docRef = doc(gamesCol);
      await setDoc(docRef, {
        ...data,
        uid: currentUser?.uid,
      });
    }
  };

  const [existingReviewText, setexistingReviewText] = useState(false);

  const addReview = async (data: Review) => {
    const existingReview = reviews?.some(
      (review) => review.uid === currentUser?.uid && review.gameId === gameId
    );
    if (existingReview) {
      setexistingReviewText(true);
    } else {
      const docRef = doc(reviewsCol);
      await setDoc(docRef, {
        ...data,
        uid: currentUser?.uid,
        userEmail: currentUser?.email,
        gameId: gameId,
      });
    }
  };

  useEffect(() => {
    fetchGame();
  }, [gameId]);

  if (loading) {
    return <p>Loading Game...</p>;
  }

  return (
    <>
      {error && <Alert>{error}</Alert>}
      <GameDetailsComponent
        game={game}
        onAddGame={addGameToList}
        onAddReview={addReview}
      />
      {existingReviewText && (
        <p>You've already written a review on this game!</p>
      )}
    </>
  );
};

export default GamePage;
