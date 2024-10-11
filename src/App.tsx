import { useEffect, useState } from 'react'

import { GET_GAME_DETAIL, GET_LIST_GAMES, GET_LIST_VIDEO_GAMES_BY_GENRE, PUT_LOG } from './constants/endpoints.constants';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { Menu } from './components/Menu';
import { GameCard } from './components/GameCard';
import { Footer } from './components/Footer';
import { GameModal } from './components/GameModal';
import { AccordionLogs } from './components/AccordionLogs';

type Game = {
  id: number;
  name: string;
  background_image: string;
  genres: Genre[];
  released: string;
  metacritic: string;
  parent_platforms: ParentPlatform[];
};

type Genre = {
  id: number;
  name: string;
}

type Platform = {
  name: string;
}

type ParentPlatform = {
  platform: Platform;
};

type GameDetail = {
  name: string;
  description_raw: string;
  website: string;
  publishers: Publisher[];
  alternative_names: string[];
};

type Publisher = {
  name: string
};

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedGenreGame, setSelectedGenreGame] = useState<Genre>({id: 0, name: 'All'});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedGameDetails, setSelectedGameDetails] = useState<GameDetail | null>(null);

  const handleMenuGenreClick = (genre: Genre) => {
    setSelectedGenreGame(genre);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleGameDetailClick = async (gameId: number) => {
    try {
      const response = await fetch(GET_GAME_DETAIL(gameId));

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      setSelectedGameDetails(data);
      setShowModal(true);

      registerLog('GET_GAME_DETAIL', data.results);
    } catch (error) {
      console.error('Error when searching for games:', error);
    }
  }

  const fetchGames = async (genreId?: number) => {
    setLoading(true);

    try {
      const url = genreId ? GET_LIST_VIDEO_GAMES_BY_GENRE(genreId) : GET_LIST_GAMES;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      setGames(data.results);

      const method = genreId ? 'GET_LIST_VIDEO_GAMES_BY_GENRE' : 'GET_LIST_GAMES';

      registerLog(method, data.results.length);

    } catch (error) {
      console.error('Error when searching for games:', error);
    } finally {
      setLoading(false);
    }
  }

  const registerLog = async (method: string, ret: string) => {
    try {
      const response = await fetch(PUT_LOG(method, ret));

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

    } catch (error) {
      console.error('Error registering log:', error);
    }
  }

  useEffect(() => {
    fetchGames(selectedGenreGame?.id !== 0 ? selectedGenreGame?.id : undefined);
  }, [selectedGenreGame]);

  useEffect(() => {
    fetchGames();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <Menu onMenuGenreClick={handleMenuGenreClick}/>
      <Container fluid>
        <main>
          <h2 className="title text-center my-4">{selectedGenreGame?.name} Games</h2>
          <Row className="g-4">
            {games.map((game: Game) => (
              <Col key={game.id} xs={12} sm={6} md={4} lg={3} className='col-card'>
                <GameCard
                  game={game}
                  onDetailClick={() => handleGameDetailClick(game.id)}
                />
              </Col>
            ))}
          </Row>
        </main>
      </Container>

      <AccordionLogs />
      
      <Footer />

      <GameModal
        show={showModal}
        selectedGameDetails={selectedGameDetails}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
}

export default App;
