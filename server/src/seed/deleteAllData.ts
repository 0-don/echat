import "dotenv/config";
import { createConnection } from "typeorm";

const main = async () => {
  console.log("test");

  createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,
    username: "postgres",
    password: "root",
    database: "Echat",
    entities: [],
  })
    .then(async (connection) => {
      await connection.query("DELETE FROM public.image");
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
