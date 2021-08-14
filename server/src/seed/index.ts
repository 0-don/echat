import 'dotenv/config';
import { createConnection } from 'typeorm';
import faker from 'faker';
import { User } from '../entity/User';
import { Image } from '../entity/Image';
import { ENTITIES } from '../constants';

const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true,
    // logging: true,
    entities: [ENTITIES],
  });

  // await User.delete({});

  for (let i = 0; i < 10; i++) {
    const user = {
      type: "user",
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
      .returning('*')
      .execute();

    let userId: number = dbUser.raw[0].id;

    let images = [];
    images.push({
      type: 'profile',
      url: faker.image.imageUrl(),
      publicId: `${Math.random()}`,
      userId,
    });
    images.push({
      type: 'cover',
      url: faker.image.imageUrl(),
      publicId: `${Math.random()}`,
      userId,
    });
    images.push({
      type: 'secondary',
      url: faker.image.imageUrl(),
      publicId: `${Math.random()}`,
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
  }
  console.log('finished');
};
main();
