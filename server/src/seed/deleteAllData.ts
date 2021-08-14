import "dotenv/config";
import { createConnection } from "typeorm";

const deleteAllData = async () => {
  const keys = [
    "public.image",
    "public.user_game",
    "public.language",
    "public.schedule",
    "public.images",
    "public.user",
  ];
  await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,
    username: "postgres",
    password: "root",
    database: "Echat",
    entities: [],
  })
    .then(async (connection) => {
      for (let i = 0; i < keys.length; i++) {
        await connection.query(`DELETE FROM ${keys[i]}`);
      }
    })
    .catch((error) => console.log(error));

  console.log("test2");
};
deleteAllData();
