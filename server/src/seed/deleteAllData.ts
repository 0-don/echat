import "dotenv/config";
import { createConnection } from "typeorm";
import { Language } from "../entity/Language";
import { User } from "../entity/User";
import { Image } from "../entity/Image";
import { Game } from "../entity/Game";
import { GameImage } from "../entity/GameImage";
import { UserGame } from "../entity/UserGame";
import { Schedule } from "../entity/Schedule";
const main = async () => {
  console.log("test");

  createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,
    username: "postgres",
    password: "root",
    database: "Echat",
    entities: [User, Language, Image, Game, GameImage, UserGame, Schedule],
  })
    .then(async (connection) => {
      await connection.query("DELETE FROM public.user_game");
      await connection.query("DELETE FROM public.language");
      await connection.query("DELETE FROM public.schedule");
      await connection.query("DELETE FROM public.images");
      await connection.query("DELETE FROM public.user");
    })
    .catch((error) => console.log(error));

  console.log("test2");
};
main();
