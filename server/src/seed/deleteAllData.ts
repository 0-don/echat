import "dotenv/config";
import { createConnection } from "typeorm";
import { ENTITIES } from "../constants";
import { User } from "../entity/User";
import { Image } from "../entity/Image";
const main = async () => {
  console.log("test");
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,
    username: "postgres",
    password: "root",
    entities: [ENTITIES],
  });

  await conn.createQueryBuilder().delete().from(User).execute();
  await conn.createQueryBuilder().delete().from(Image).execute();
  console.log("test2");
};
main();
