import { useCallback, useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { GET_LIST_GAMES, GET_LIST_VIDEO_GAMES_BY_GENRE, PUT_LOG } from "../constants/endpoints.constants";
import { GameCard } from "./GameCard";

type GameListProps = {
    genreId: number;
    fetchGameDetail: (gameId: number) => void;
};

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

type ParentPlatform = {
    platform: Platform;
};

type Platform = {
    name: string;
}

export function GameList({ genreId, fetchGameDetail }: GameListProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [games, setGames] = useState<Game[]>([]);

    const fetchRegisterLog = async (method: string, ret: string) => {
        try {
            const response = await fetch(PUT_LOG(method, ret));
    
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
    
        } catch (error) {
            console.error('Error registering log:', error);
        }
    }
    
    const fetchGames = useCallback(async (genreId?: number) => {
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
    
            fetchRegisterLog(method, data.results.length);
    
            setLoading(false);
        } catch (error) {
            console.error('Error when searching for games:', error);
        }
    }, [genreId]);

    useEffect(() => {
        fetchGames(genreId);
    }, [genreId]);

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
        <Row className="g-4">
            {games.map((game: Game) => (
              <Col key={game.id} xs={12} sm={6} md={4} lg={3} className='col-card'>
                <GameCard
                  game={game}
                  onDetailClick={() => fetchGameDetail(game.id)}
                />
              </Col>
            ))}
        </Row>
    );
}