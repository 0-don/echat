import "dotenv/config";
import { createConnection } from "typeorm";
import faker from "faker";
import { Language } from "../entity/Language";
import { User } from "../entity/User";
import { Image } from "../entity/Image";
import { Game } from "../entity/Game";
import { GameImage } from "../entity/GameImage";
import { UserGame } from "../entity/UserGame";
import { Schedule } from "../entity/Schedule";
const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,
    username: "postgres",
    password: "root",
    database: "Echat",
    entities: [User, Language, Image, Game, GameImage, UserGame, Schedule],
  });

  for (let i = 0; i < 100; i++) {
    const user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      description: faker.lorem.text(),
      age: faker.datatype.datetime(),
      gender: faker.name.gender(),
      country: faker.address.country(),
      discord: faker.internet.userName(),
      twitter: faker.internet.userName(),
      facebook: faker.internet.userName(),
      snapchat: faker.internet.userName(),
      instagram: faker.internet.userName(),
      twitch: faker.internet.userName(),
      steam: faker.internet.userName(),
      tiktok: faker.internet.userName(),
    };

    const dbUser = await conn
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(user)
      .returning("*")
      .execute();

    let userId: number = dbUser.raw[0].id;
    dbUser;

    const profile = {
      type: "profile",
      url: faker.image.imageUrl(),
      publicId: `${Math.random()}`,
      userId,
    };

    const cover = {
      type: "cover",
      url: faker.image.imageUrl(),
      publicId: `${Math.random()}`,
      userId,
    };
    const secondary = {
      type: "secondary",
      url: faker.image.imageUrl(),
      publicId: `${Math.random()}`,
      userId,
    };

    let images = [];
    images.push(profile);
    images.push(cover);
    images.push(secondary);

    await conn
      .createQueryBuilder()
      .insert()
      .into(Image)
      .values(images)
      .returning("*")
      .execute();
  }
};
main();
