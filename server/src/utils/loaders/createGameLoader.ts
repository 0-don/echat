import DataLoader from 'dataloader';
import { Game } from '../../entity/Game';

export const createGameLoader = () =>
  new DataLoader<number, Game>(async (gameIds) => {
    const games = await Game.findByIds(gameIds as number[]);

    const gameIdToGame: Record<number, Game> = {};

    games.forEach((u) => {
      gameIdToGame[u.id] = u;
    });

    const sortedGames = gameIds.map((gameId) => gameIdToGame[gameId]);

    return sortedGames;
  });
