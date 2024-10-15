import { useState } from 'react'

import { GET_GAME_DETAIL, PUT_LOG } from './constants/endpoints.constants';
import { Container } from 'react-bootstrap';
import { Menu } from './components/Menu';
import { Footer } from './components/Footer';
import { GameModal } from './components/GameModal';
import { AccordionLogs } from './components/AccordionLogs';
import { GameList } from './components/GameList';

type Genre = {
  id: number;
  name: string;
}

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
  const [selectedGenreGame, setSelectedGenreGame] = useState<Genre>({id: 0, name: 'All'});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedGameDetails, setSelectedGameDetails] = useState<GameDetail | null>(null);

  const handleMenuGenreClick = (genre: Genre) => {
    setSelectedGenreGame(genre);
  };

  const handleCloseModal = () => setShowModal(false);

  const fetchGameDetail = async (gameId: number) => {
    try {
      const response = await fetch(GET_GAME_DETAIL(gameId));

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data: GameDetail = await response.json();

      setSelectedGameDetails(data);
      setShowModal(true);

      registerLog('GET_GAME_DETAIL', data.name);
    } catch (error) {
      console.error('Error when searching for games:', error);
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

  return (
    <>
      <Menu onMenuGenreClick={handleMenuGenreClick}/>
      <Container fluid>
        <main>
          <h2 className="title text-center my-4">{selectedGenreGame?.name} Games</h2>
          <GameList genreId={selectedGenreGame.id} fetchGameDetail={fetchGameDetail} />
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
