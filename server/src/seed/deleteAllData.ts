import 'dotenv/config';
import { createConnection } from 'typeorm';
import { Service } from '../entity/Service';
// import { User } from '../entity/User';
import { log } from 'console';
// import { Room } from '../entity/Room';
import { User } from '../entity/User';

const main = async () => {
  await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true,
    entities: [__dirname + '/../entity/*'],
  });

  await User.delete({ fake: true });
  // await getConnection()#
  //   .createQueryBuilder()
  //   .delete()
  //   .from(Room)
  //   .where('channel <> :channel', { channel: 'global' })
  //   .execute();
  await Service.delete({ type: 'Games' });

  log('finished');
};

main();
