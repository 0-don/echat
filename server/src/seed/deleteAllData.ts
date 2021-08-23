import 'dotenv/config';
import { createConnection } from 'typeorm';
import { Service } from '../entity/Service';
import { User } from '../entity/User';
import { log } from 'console';

const main = async () => {
  await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true,
    entities: [__dirname + '/../entity/*'],
  });

  await User.delete({ fake: true });
  await Service.delete({ type: 'Games' });

  log('finished');
};

main();
