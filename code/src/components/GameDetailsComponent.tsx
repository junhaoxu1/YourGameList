import Container from "react-bootstrap/Container";
import { Form, Col, Button, InputGroup, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GameTitle } from "../types/Game.types";
import { Review } from "../types/Review.types";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import ReviewListComponent from "./ReviewListComponent";
import useAuth from "../hooks/useAuth";
import { gamesCol, reviewsCol } from "../services/firebase";
import { getDocs, query, where, doc, deleteDoc } from "firebase/firestore";
import useGetGames from "../hooks/useGetGames";

interface GameDetailProps {
  game: GameTitle | null;
  onAddGame: (data: GameTitle) => Promise<void>;
  onAddReview: (data: Review) => Promise<void>;
}

const GameDetailsComponent = ({
  game,
  onAddGame,
  onAddReview,
}: GameDetailProps) => {
  if (!game) {
    return;
  }

  const { currentUser } = useAuth();
  const [selectedNav, setSelectedNav] = useState("Description");
  const { data: games } = useGetGames(currentUser?.uid);

  const gameExists = games?.some((g) => g.name === game.name);

  const [averageScore, setAverageScore] = useState<number | null>(null);
  const [newScore, setNewScore] = useState<number | null>(null);

  const handleDeleteReview = async (reviewId: string) => {
    try {
      const docRef = doc(reviewsCol, reviewId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting game:", error);
    }
  };

  useEffect(() => {
    const getAverageScore = async () => {
      const col = gamesCol;
      const snapshot = await getDocs(
        query(col, where("name", "==", game?.name))
      );

      const scores: number[] = [];

      snapshot.forEach((doc) => {
        const score = doc.data().score;
        scores.push(score);
      });

      const sum = scores.reduce((total, score) => total + score, 0);
      const averageScore = sum / scores.length;
      const limitScore = parseFloat(averageScore.toFixed(2));

      setAverageScore(limitScore);

      if (newScore !== null) {
        const updatedAverageScore = (sum + newScore) / (scores.length + 1);
        const limitAverageScore = parseFloat(updatedAverageScore.toFixed(2));
        setAverageScore(limitAverageScore);
        setNewScore(null);
      }
    };

    getAverageScore();
  }, [game, newScore]);

  const renderFromNav = () => {
    if (selectedNav === "Description") {
      return (
        <Col>
          <h2>Game Description</h2>
          <p>{game.description.replace(/<\/?[^>]+(>|$)/g, "")}</p>
        </Col>
      );
    } else if (selectedNav === "Reviews") {
      return (
        <Col>
          <h2>Reviews</h2>
          <ReviewListComponent
            gameId={game.id}
            onDeleteGame={handleDeleteReview}
          />
        </Col>
      );
    }
  };

  const {
    handleSubmit: gameSubmit,
    register: registerGame,
    formState: gameFormState,
    reset: gameReset,
  } = useForm<GameTitle>();

  const {
    handleSubmit: reviewSubmit,
    register: registerReview,
    formState: reviewFormState,
    reset: reviewReset,
  } = useForm<Review>();

  const onSubmitGame: SubmitHandler<GameTitle> = async (data: GameTitle) => {
    await onAddGame(data);

    setNewScore(parseFloat(data.score));
  };

  const onSubmitReview: SubmitHandler<Review> = async (data: Review) => {
    await onAddReview(data);
  };

  useEffect(() => {
    if (gameFormState.isSubmitSuccessful) {
      gameReset();
    }
  }, [gameFormState.isSubmitSuccessful, gameReset]);

  useEffect(() => {
    if (reviewFormState.isSubmitSuccessful) {
      reviewReset();
    }
  }, [reviewFormState.isSubmitSuccessful, reviewReset]);

  return (
    <>
      <div className="d-flex">
        <Container className="left-detail">
          <Col>
            <h1>{game.name}</h1>
            {game.background_image ? (
              <img
                className="border border-dark img-fluid"
                style={{ width: "40%" }}
                src={game.background_image}
                alt={game.name}
              />
            ) : (
              <img src="" alt="Placeholder" />
            )}
            <h2>Information</h2>
            <div className="d-flex gap-2">
              <p>Developers:</p>
              {game.developers.map((developer) => (
                <p key={developer.id}>{developer.name}</p>
              ))}
            </div>
            <p>Release Date: {game.released}</p>
            <div className="d-flex gap-2">
              <p>Genres: </p>
              {game.genres.map((genre) => (
                <p key={genre.id}>{genre.name}</p>
              ))}
            </div>
            <div className="d-flex gap-2">
              <p>Score: </p>
              {averageScore !== null && !isNaN(averageScore)
                ? `${averageScore} / 5`
                : "N/A / 5"}
            </div>
            {currentUser ? (
              <>
                <Form
                  className="dropdown-score"
                  onSubmit={gameSubmit(onSubmitGame)}
                >
                  <InputGroup>
                    <Form.Control
                      type="text"
                      defaultValue={game.name}
                      className="d-none"
                      {...registerGame("name")}
                    />
                    <Form.Control
                      type="text"
                      defaultValue={game.background_image}
                      className="d-none"
                      {...registerGame("background_image")}
                    />
                    <Form.Control
                      type="text"
                      defaultValue={game.genres.map((genre) => genre.name)}
                      className="d-none"
                      {...registerGame("genres")}
                    />
                    <Form.Control
                      type="text"
                      defaultValue={game.id}
                      className="d-none"
                      {...registerGame("id")}
                    />
                    {gameExists ? (
                      <Button variant="dark" disabled>
                        Game is already in list
                      </Button>
                    ) : (
                      <>
                        <Form.Select
                          aria-label="Default select example"
                          {...registerGame("score", {
                            required: "Please set a score",
                          })}
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Form.Select>
                        <Button type="submit" variant="dark">
                          Add To List
                        </Button>
                      </>
                    )}
                  </InputGroup>
                </Form>
                <Form
                  className="user-review"
                  onSubmit={reviewSubmit(onSubmitReview)}
                >
                  <Form.Group>
                    <Form.Label>Review the game here!</Form.Label>
                    <Form.Control
                      className="user-review-box"
                      as="textarea"
                      rows={3}
                      {...registerReview("text", {
                        required: "Please Enter at least 1 character",
                        minLength: {
                          value: 1,
                          message: "Please enter at least 1 character",
                        },
                      })}
                    />
                  </Form.Group>
                  <Button type="submit" variant="dark">
                    Review Game
                  </Button>
                </Form>
              </>
            ) : (
              <p>
                <Link to="/login">Login </Link>
                To Review Game! or
                <Link to="/signup"> Signup! </Link>
              </p>
            )}
          </Col>
        </Container>
        <Container className="right-detail">
          <ListGroup horizontal>
            <ListGroup.Item
              variant="dark"
              active={selectedNav === "Description"}
              onClick={() => setSelectedNav("Description")}
            >
              Description
            </ListGroup.Item>
            <ListGroup.Item
              variant="dark"
              active={selectedNav === "Reviews"}
              onClick={() => setSelectedNav("Reviews")}
            >
              Reviews
            </ListGroup.Item>
          </ListGroup>
          <Col className="right-block">{renderFromNav()}</Col>
        </Container>
      </div>
    </>
  );
};

export default GameDetailsComponent;
