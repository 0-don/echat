import fs from 'fs';
import 'dotenv/config';
import { createConnection, getConnection } from 'typeorm';
import { Service } from '../entity/Service';
import { ServiceImage } from '../entity/ServiceImage';
import { getGames } from './getGames';
import { log } from 'console';
import { Services } from './types';

export const gamesGen = async (externalCheck: boolean) => {
  if (process.env.TWITCH_CLIENT_ID && !fs.existsSync('games.json')) {
    await getGames();
  } else if (!process.env.TWITCH_CLIENT_ID && !fs.existsSync('games.json')) {
    return;
  }

  const data = fs.readFileSync('games.json', 'utf-8');

  if (externalCheck) {
    const generatedGames = await Service.find({ type: 'Games' });
    if (generatedGames.length) {
      return;
    }
  } else {
    await createConnection({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: true,
      entities: [__dirname + '/../entity/*'],
    });
  }

  let services: Services[] = JSON.parse(data);

  for (let service of services) {
    log(`Upload ${service.popularity}/${services.length}: ${service.name}`);
    let { images, ...serviceData } = service;

    let findService;

    findService = await Service.findOne({ igdbId: serviceData.igdbId });

    if (!findService) {
      findService = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Service)
        .values(serviceData)
        .returning('*')
        .execute();
    } else {
      findService = await getConnection()
        .createQueryBuilder()
        .update(Service, serviceData)
        .where('igdbId = :igdbId', { igdbId: serviceData.igdbId })
        .returning('*')
        .updateEntity(true)
        .execute();
    }

    const serviceId = findService.raw[0].id;

    if (images) {
      images.forEach((image) => (image.serviceId = serviceId));

      await ServiceImage.delete({ serviceId });
      await ServiceImage.insert(images);
    }
  }
};

if (process.argv[2] === 'gen') {
  gamesGen(false);
}
