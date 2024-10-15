const key = '?key=cd865ed95e11486d80976fe50b13bc5e';
const registration = '403769';
const api = 'rawg'

export const GET_LIST_VIDEO_GAMES_GENRES = `https://api.rawg.io/api/genres${key}`;

export const GET_LIST_GAMES = `https://api.rawg.io/api/games${key}`;

export const GET_GAME_DETAIL_PATH = 'https://api.rawg.io/api/games/';

export const GET_LIST_LOGS = 'https://www.piway.com.br/unoesc/api/logs/' + registration;

export const PUT_LOG_PATH = 'https://www.piway.com.br/unoesc/api/inserir/log/' + registration + '/' + api;

export const DELET_LOG_PATH = 'https://www.piway.com.br/unoesc/api/excluir/log/';

export function DELET_LOG(logId: number): string {
    return DELET_LOG_PATH + logId + '/aluno/' + registration ;
}

export function PUT_LOG(method: string, ret: string): string {
    return PUT_LOG_PATH + '/' + method + '/' + ret;
}

export function GET_LIST_VIDEO_GAMES_BY_GENRE(genreId: number): string {
    return GET_LIST_GAMES + `&genres=${genreId}`;
}

export function GET_GAME_DETAIL(gameId: number): string {
    return GET_GAME_DETAIL_PATH + gameId + key;
}
