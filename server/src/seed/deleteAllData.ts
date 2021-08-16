import "dotenv/config";
import { createConnection } from "typeorm";
import { User } from "../entity/User";

import { ENTITIES } from "../constants";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,
    entities: [ENTITIES],
  });
  conn;
  // await conn.createQueryBuilder().delete().from(User).execute()
  await User.delete({});

  console.log("finished");
};
main();
