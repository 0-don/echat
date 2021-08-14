import 'dotenv/config';
import { createConnection } from 'typeorm';
import { User } from '../entity/User';
import { ENTITIES } from '../constants';

const main = async () => {
  await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true,
    entities: [ENTITIES],
  });

  User.delete({});

  console.log('finished');
};
main();
