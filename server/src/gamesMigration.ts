import fs from 'fs';
import 'dotenv/config';
import { createConnection } from 'typeorm';
import { ENTITIES } from './constants';
import { Game } from './entity/Game';

const data = fs.readFileSync('games.json', 'utf-8');

export interface Image {
  type: string;
  url: string;
  width: number;
  height: number;
}

export interface Games {
  twitchId: number;
  boxArtUrl: string;
  igdbId: number;
  name: string;
  popularity: number;
  first_release_date?: string;
  platforms: string[];
  genres: string[];
  multiplayer_modes: string[];
  images: Image[];
}

const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true,
    // logging: true,
    entities: [ENTITIES],
  });
  conn;

  let games: Games[] = JSON.parse(data);
  for (let game of games) {
    console.log(game.popularity, game.name);
    const { images, ...gameData } = game;

    const findGame = await Game.findOne({ igdbId: gameData.igdbId });
    if (!findGame) {
      await Game.insert(gameData);
    } else {
      await Game.update({ igdbId: gameData.igdbId }, gameData);
    }
  }
};

main();
