import { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import { GameTitles } from "../types/Game.types";
import * as GameAPI from "../services/GameAPI.service.";
import GameListComponent from "../components/GameListComponent";
import Container from "react-bootstrap/Container";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../components/PaginationComponent";

const GameListPage = () => {
  const [games, setGames] = useState<GameTitles | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const pageKey = "page";

  const getGames = async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await GameAPI.getGames(page);
      setGames((data as GameTitles) || null);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    }
    setLoading(false);
  };

  const [page, setPage] = useState(() => {
    const initialPage = parseInt(query.get(pageKey) || "1");
    return initialPage;
  });

  const handleNextPage = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    query.set(pageKey, nextPage.toString());
    setSearchParams(searchParams);
    navigate(`?${query.toString()}`, { replace: true });
  };

  const handlePreviousPage = () => {
    const previousPage = Math.max(page - 1, 1);
    setPage(previousPage);
    query.set(pageKey, previousPage.toString());
    setSearchParams(searchParams);
    navigate(`?${query.toString()}`, { replace: true });
  };

  const handleFirstPage = () => {
    setPage(1);
    query.set(pageKey, "1");
    setSearchParams("1");
    navigate(`?${query.toString()}`, { replace: true });
  };

  const handleLastPage = () => {
    const lastPage = Math.ceil(Math.min(games!.count / 20));
    setPage(lastPage);
    query.set(pageKey, lastPage.toString());
    setSearchParams(lastPage.toString());
    navigate(`?${query.toString()}`, { replace: true });
  };

  useEffect(() => {
    getGames();
  }, [page]);

  useEffect(() => {
    const currentPage = parseInt(searchParams.get(pageKey) || "1");
    if (currentPage !== page) {
      setPage(currentPage);
    }
  }, [searchParams, page]);

  if (loading) {
    return <p>Loading Games...</p>;
  }

  return (
    <>
      {error && <Alert variant="warning">{error}</Alert>}
      {games && (
        <Container>
          <h1>All Games</h1>
          <GameListComponent games={games} />
          <Pagination
            page={page}
            total_pages={Math.ceil(Math.min(games.count / 20))}
            hasPreviousPage={page > 1}
            hasNextPage={page < Math.min(games.count)}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
            onFirstPage={handleFirstPage}
            onLastPage={handleLastPage}
          />
        </Container>
      )}
    </>
  );
};

export default GameListPage;
