import { Button, Card } from "react-bootstrap";

type GameCardProps = {
    game: Game;
    onDetailClick: () => void;
};

type Game = {
    id: number;
    name: string;
    background_image: string;
    genres: Genre[];
    released: string;
    metacritic: string;
    parent_platforms: ParentPlatform[];
}

type Genre = {
    name: string;
}

type Platform = {
    name: string;
}

type ParentPlatform = {
    platform: Platform;
};

export function GameCard({ game, onDetailClick }: GameCardProps) {
    return (
        <Card className="game">
            <Card.Img variant="top" src={game.background_image} alt="Game image"></Card.Img>
            <Card.Body className='card-body'>
                <Card.Title>{game.name}</Card.Title>
                    <ul>
                        <li><b>Genres:</b> {formaterListGenre(game.genres)}</li>
                        <li><b>Released:</b> {game.released}</li>
                        <li><b>Metacritic:</b> {game.metacritic}</li>
                        <li><b>Plataforms:</b> {formaterListPlataform(game.parent_platforms)}</li>
                    </ul>
                <Button
                    variant="primary"
                    className="btn-detail"
                    onClick={onDetailClick}
                >
                    Details
                </Button>
            </Card.Body>
        </Card>
    );
};

function formaterListGenre(genres: Genre[]): string {
    return genres.map(genre => genre.name).join(', ');
}

function formaterListPlataform(parent_platforms: ParentPlatform[]): string {
    return parent_platforms.map(parentPlatform => parentPlatform.platform.name).join(', ');
}