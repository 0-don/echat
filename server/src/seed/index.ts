import 'dotenv/config';
import { createConnection } from 'typeorm';
import faker from 'faker';
import { User } from '../entity/User';
import { Image } from '../entity/Image';
import { ENTITIES } from '../constants';
import { coinFlip, getRandomBetween } from '../utils';
import { Game } from '../entity/Game';

const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true,
    // logging: true,
    entities: [ENTITIES],
  });

  // await User.delete({});

  const games = await Game.find({ order: { popularity: 'ASC' } });
  const gamesLength = games.length;
  gamesLength;
  for (let i = 0; i < 10; i++) {
    const user = {
      type: 'user',
      fake: true,
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      description: coinFlip() ? faker.lorem.text() : undefined,
      age: coinFlip() ? faker.datatype.datetime() : undefined,
      gender: coinFlip() ? faker.name.gender() : undefined,
      country: coinFlip() ? faker.internet.userName() : undefined,
      discord: coinFlip() ? faker.internet.userName() : undefined,
      twitter: coinFlip() ? faker.internet.userName() : undefined,
      facebook: coinFlip() ? faker.internet.userName() : undefined,
      snapchat: coinFlip() ? faker.internet.userName() : undefined,
      instagram: coinFlip() ? faker.internet.userName() : undefined,
      twitch: coinFlip() ? faker.internet.userName() : undefined,
      steam: coinFlip() ? faker.internet.userName() : undefined,
      tiktok: coinFlip() ? faker.internet.userName() : undefined,
    };

    const dbUser = await conn
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(user)
      .returning('*')
      .execute();

    let userId: number = dbUser.raw[0].id;

    let images = [];
    images.push({
      type: 'profile',
      url: `${faker.image.imageUrl()}/${faker.datatype.uuid()}`.replace(
        'http://',
        'https://'
      ),
      publicId: `${faker.datatype.uuid()}`,
      userId,
    });
    images.push({
      type: 'cover',
      url: `${faker.image.imageUrl()}/${faker.datatype.uuid()}`.replace(
        'http://',
        'https://'
      ),
      publicId: `${faker.datatype.uuid()}`,
      userId,
    });
    images.push({
      type: 'secondary',
      url: `${faker.image.imageUrl()}/${faker.datatype.uuid()}`.replace(
        'http://',
        'https://'
      ),
      publicId: `${faker.datatype.uuid()}`,
      userId,
    });

    await conn
      .createQueryBuilder()
      .insert()
      .into(Image)
      .values(images)
      .returning('*')
      .execute();

    console.log(i);
    for (let x = 0; x < getRandomBetween(1, 4); x++) {
      console.log(getRandomBetween(0, gamesLength))
      let game = games[getRandomBetween(0, gamesLength)];
      console.log(game)
      const userGame = {
        status: true,
        level: 'Newbie',
        platforms: game?.platforms,
        description: coinFlip() ? faker.lorem.text() : undefined,
        price: getRandomBetween(1, 10),
        per: ['Game', '15 Min', '30 Min', '45 Min', '60 Min'][
          getRandomBetween(0, 4)
        ],
        userId,
        gameId: game.id,
      };
      await Game.insert(userGame);
      console.log(`x: ${x}`);
    }
  }

  console.log('finished');
};
main();
