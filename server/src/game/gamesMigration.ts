import fs from 'fs';
import 'dotenv/config';
import { createConnection } from 'typeorm';
import { ENTITIES } from '../constants';
import { Game } from '../entity/Game';
import { GameImage } from '../entity/GameImage';
import { getGames } from './getGames';

export interface Image {
  gameId: number;
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
  images: Image[] | undefined;
}

const main = async () => {
  await getGames();

  const data = fs.readFileSync('games.json', 'utf-8');

  const conn = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true,
    // logging: true,
    entities: [ENTITIES],
  });

  let games: Games[] = JSON.parse(data);
  for (let game of games) {
    console.log(game.popularity, game.name);
    let { images, ...gameData } = game;

    let findGame;
    findGame = await Game.findOne({ igdbId: gameData.igdbId });
    if (!findGame) {
      findGame = await conn
        .createQueryBuilder()
        .insert()
        .into(Game)
        .values(gameData)
        .returning('*')
        .execute();
    } else {
      findGame = await conn
        .createQueryBuilder()
        .update(Game, gameData)
        .where('igdbId = :igdbId', { igdbId: game.igdbId })
        .returning('*')
        .updateEntity(true)
        .execute();
    }
    const gameId = findGame.raw[0].id;
    if(images) {
      images.forEach((image) => (image.gameId = gameId));

      await GameImage.delete({ gameId });
      await GameImage.insert(images);
    }
  }
  process.exit();
};

main();
