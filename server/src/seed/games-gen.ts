import fs from 'fs';
import 'dotenv/config';
import { createConnection } from 'typeorm';
import { Service } from '../entity/Service';
import { ServiceImage } from '../entity/ServiceImage';
import { getGames } from './getGames';
import { log } from 'console';

export interface Image {
  serviceId: number;
  type: string;
  url: string;
  width: number;
  height: number;
}

export interface Services {
  type: string;
  twitchId: number;
  boxArtUrl: string;
  igdbId: number;
  name: string;
  popularity: number;
  first_release_date?: string;
  platforms: { id: number; name: string }[];
  genres: { id: number; name: string }[];
  multiplayer_modes: string[];
  images: Image[] | undefined;
  slug: string;
}

const main = async () => {
  if (process.env.TWITCH_CLIENT_ID && !fs.existsSync('games.json')) {
    await getGames();
  }

  const data = fs.readFileSync('games.json', 'utf-8');

  const conn = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true,
    // logging: true,
    entities: [__dirname + '/../entity/*'],
  });

  let services: Services[] = JSON.parse(data);

  for (let service of services) {
    log(`Upload ${service.popularity}/${services.length}: ${service.name}`);
    let { images, ...serviceData } = service;

    let findService;

    findService = await Service.findOne({ igdbId: serviceData.igdbId });

    if (!findService) {
      findService = await conn
        .createQueryBuilder()
        .insert()
        .into(Service)
        .values(serviceData)
        .returning('*')
        .execute();
    } else {
      findService = await conn
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

main();
