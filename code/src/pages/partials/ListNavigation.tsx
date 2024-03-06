import { useState, useEffect } from "react";
import {
  Container,
  Navbar,
  Form,
  FormControl,
  Button,
  Dropdown,
} from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { GameTitles } from "../../types/Game.types";
import { searchGames } from "../../services/GameAPI.service.";

const ListNavigation = () => {
  const [search, setSearch] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchResult, setSearchResult] = useState<GameTitles | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query");

  const hoverOn = () => {
    setDropdownVisible(true);
    setSearchParams({});
  };

  const hoverOff = () => {
    setTimeout(() => {
      setDropdownVisible(false);
    }, 5000);
  };

  const searchForGames = async (searchQuery: string) => {
    setSearchResult(null);

    try {
      const res = await searchGames(searchQuery);
      setSearchResult(res);
    } catch (err: unknown) {
      console.error("Error:", err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!search.trim().length) {
      return;
    }
    setSearchParams({ query: search });
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    searchForGames(query);
  }, [query]);

  useEffect(() => {
    if (searchResult && searchResult.results.length > 0) {
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
    }
  }, [searchResult]);

  return (
    <Navbar>
      <Container className="border border-light">
        <Navbar.Brand className="nav-brand" as={Link} to="/games">
          Browse Games
        </Navbar.Brand>
        <Form onSubmit={handleSubmit} className="d-flex">
          <FormControl
            id="search-form-control"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <Button variant="dark" type="submit" disabled={!search.trim().length}>
            Search
          </Button>
          {searchResult && searchResult.results.length > 0 && (
            <Dropdown className="search-dropdown" show={dropdownVisible}>
              <Dropdown.Menu>
                {searchResult.results.slice(0, 5).map((game) => (
                  <Dropdown.Item
                    href={`/game/${game.id}`}
                    onMouseEnter={hoverOn}
                    onMouseLeave={hoverOff}
                    key={game.id}
                  >
                    {game.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Form>
      </Container>
    </Navbar>
  );
};

export default ListNavigation;
