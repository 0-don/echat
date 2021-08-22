import 'dotenv/config';
import { Service } from '../entity/Service';
import { createConnection } from 'typeorm';
import { User } from '../entity/User';
import { log } from 'console';

const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true,
    entities: [__dirname + '/../entity/*'],
  });
  conn;
  // await conn.createQueryBuilder().delete().from(User).execute()
  await User.delete({ fake: true });
  await Service.delete({ type: 'Games' });

 log('finished');
  process.exit();
};
main();
