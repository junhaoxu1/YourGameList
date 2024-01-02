import Container from "react-bootstrap/Container";
import { Form, Col, Button, InputGroup, ListGroup } from "react-bootstrap";
import { GameTitle } from "../types/Game.types";
import { Review } from "../types/Review.types";
import { useForm, SubmitHandler} from 'react-hook-form'
import { useEffect, useState } from "react";
import ReviewListComponent from "./ReviewListComponent";

interface GameDetailProps {
  game: GameTitle | null;
  onAddGame: (data: GameTitle) => Promise<void>
  onAddReview: (data: Review) => Promise<void>;
}

const GameDetailsComponent = ({ game, onAddGame, onAddReview }: GameDetailProps) => {
  if (!game) {
    return;
  }

  const [selectedNav, setSelectedNav] = useState("Description")

  const renderFromNav = () => {
    if(selectedNav === "Description") {
        return <Col>
                    <h2>Game Description</h2>
                    <p>{game.description.replace(/<\/?[^>]+(>|$)/g, "")}</p>
               </Col>
    } else if (selectedNav === "Reviews") {
        return <Col>
                    <h2>Reviews</h2>
                    <ReviewListComponent gameId={game.id}/>
               </Col>
    }
  }

  const { handleSubmit: gameSubmit, register: registerGame, formState: gameFormState, reset: gameReset } = useForm<GameTitle>();
  const { handleSubmit: reviewSubmit, register: registerReview, formState: reviewFormState, reset: reviewReset } = useForm<Review>();

  const onSubmitGame: SubmitHandler<GameTitle> = async (data: GameTitle) => {
    await onAddGame(data)
  }

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
          <Form 
          className="dropdown-score"
          onSubmit={gameSubmit(onSubmitGame)}>
            <InputGroup>
                <Form.Control
                    type="text"
                    defaultValue={game.name}
                    className="d-none"
                    {...registerGame('name')}
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
                <Form.Select 
                    {...registerGame("score")}
                >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Form.Select>
                <Button
                    type="submit"
                    variant="success"
                >Add To List</Button>
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
            {...registerReview("text")} 
          />
        </Form.Group>
        <Button type="submit" variant="success">
          Review Game
        </Button>
      </Form>
        </Col>
        </Container>
        <Container className="right-detail">
          <ListGroup horizontal>
            <ListGroup.Item
                active={selectedNav === "Description"}
                onClick={() => setSelectedNav("Description")}
            >
                Description</ListGroup.Item>
            <ListGroup.Item
                active={selectedNav === "Reviews"}
                onClick={() => setSelectedNav("Reviews")}
            >
                Reviews</ListGroup.Item>
          </ListGroup>
          <Col className="right-block">
                {renderFromNav()}
          </Col>
        </Container>
      </div>
    </>
  );
};

export default GameDetailsComponent;
