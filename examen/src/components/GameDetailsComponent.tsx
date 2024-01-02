import Container from "react-bootstrap/Container";
import { Form, Col, Button, InputGroup, ListGroup } from "react-bootstrap";
import { GameTitle } from "../types/Game.types";
import { useForm, SubmitHandler} from 'react-hook-form'
import { useEffect, useState } from "react";
import ReviewListComponent from "./ReviewListComponent";

interface GameDetailProps {
  game: GameTitle | null;
  onAddGame: (data: GameTitle) => Promise<void>
}

const GameDetailsComponent = ({ game, onAddGame }: GameDetailProps) => {
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

  const { handleSubmit, register, formState: { isSubmitSuccessful }, reset } = useForm<GameTitle>()

  const onSubmitGame: SubmitHandler<GameTitle> = async (data: GameTitle) => {
    await onAddGame(data)
  }

  useEffect(() => {
    reset()
  }, [isSubmitSuccessful, reset])

  return (
    <>
      <div className="d-flex">
        <Container>
        <Col className="border border-dark">
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
          <Form onSubmit={handleSubmit(onSubmitGame)}>
            <InputGroup>
                <Form.Control
                    type="text"
                    defaultValue={game.name}
                    className="d-none"
                    {...register('name')}
                />
                <Form.Control 
                    type="text"
                    defaultValue={game.background_image}
                    className="d-none"
                    {...register("background_image")}
                />
                <Form.Control 
                    type="text"
                    defaultValue={game.genres.map((genre) => genre.name)}
                    className="d-none"
                    {...register("genres")}
                />
                <Form.Select aria-label="Default select example" {...register("score")}>
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
        </Col>
        </Container>
        <Container>
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
          <Col>
                {renderFromNav()}
          </Col>
        </Container>
      </div>
    </>
  );
};

export default GameDetailsComponent;
