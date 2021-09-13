import 'dotenv/config';
import { createConnection } from 'typeorm';
import faker from 'faker';
import { User } from '../entity/User';
import { Image } from '../entity/Image';
import { coinFlip, getRandomBetween } from '../utils';
import { List, Service } from '../entity/Service';
import { UserService } from '../entity/UserService';
import { log } from 'console';
import { Country } from '../entity/Country';
import { Language } from '../entity/Language';
import { UserLanguage } from '../entity/UserLanguage';

type UserType = {
  type: string;
  fake: boolean;
  username: string;
  email: string;
  password: string;
  lastOnline: Date;
  description: string | undefined;
  age: Date | undefined;
  gender: string | undefined;
  discord: string | undefined;
  twitter: string | undefined;
  facebook: string | undefined;
  snapchat: string | undefined;
  instagram: string | undefined;
  twitch: string | undefined;
  steam: string | undefined;
  tiktok: string | undefined;
  countryId: number;
};

type ImageType = {
  type: string;
  url: string;
  publicId: string;
  userId: number;
};

type UserServiceType = {
  status: boolean;
  level: string | undefined;
  platforms: List[] | undefined;
  description: string | undefined;
  price: number;
  userId: number;
  serviceId: number;
  per: string;
  image: string | undefined;
  createdAt: Date;
};

type UserLanguageType = {
  name: string;
  languageId: number;
  userId: number;
};

const imageTemplate = (
  userId: number,
  type: 'profile' | 'secondary' | 'cover'
) => ({
  type,
  url: `${faker.image.imageUrl()}/${faker.datatype.uuid()}`.replace(
    'http://',
    'https://'
  ),
  publicId: `${faker.datatype.uuid()}`,
  userId,
});

const main = async () => {
  await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true,
    // logging: true,
    entities: [__dirname + '/../entity/*'],
  });
  await User.delete({ fake: true });

  const services = await Service.find({ order: { popularity: 'ASC' } });
  const countries = await Country.find({});
  const languages = await Language.find({});

  let fakeUsers: UserType[] = [];
  for (let i = 0; i < 1000; i++) {
    const user = {
      type: 'user',
      fake: true,
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      lastOnline: new Date(
        Date.now() + 3600 * 1000 * 24 * getRandomBetween(1, 8)
      ),
      description: coinFlip() ? faker.lorem.text() : undefined,
      age: new Date(
        new Date().setFullYear(
          new Date().getFullYear() - getRandomBetween(18, 50)
        )
      ),
      gender: ['Female', 'Male', 'Other'][getRandomBetween(0, 3)],
      discord: coinFlip() ? faker.internet.userName() : undefined,
      twitter: coinFlip() ? faker.internet.userName() : undefined,
      facebook: coinFlip() ? faker.internet.userName() : undefined,
      snapchat: coinFlip() ? faker.internet.userName() : undefined,
      instagram: coinFlip() ? faker.internet.userName() : undefined,
      twitch: coinFlip() ? faker.internet.userName() : undefined,
      steam: coinFlip() ? faker.internet.userName() : undefined,
      tiktok: coinFlip() ? faker.internet.userName() : undefined,
      countryId: countries[getRandomBetween(0, countries.length - 1)].id,
    };
    fakeUsers.push(user);
  }

  await User.insert(fakeUsers);
  const users = await User.find({ where: { fake: true } });

  let images: ImageType[] = [];
  let userServices: UserServiceType[] = [];
  let userLanguages: UserLanguageType[] = [];

  users.forEach(({ id: userId, username }, index) => {
    // IMAGES
    images.push(imageTemplate(userId, 'profile'));
    images.push(imageTemplate(userId, 'cover'));
    images.push(imageTemplate(userId, 'secondary'));

    // USERSERVICES
    for (let x = 0; x < getRandomBetween(4, 8); x++) {
      let {
        id: serviceId,
        platforms,
        igdbId,
      } = services[getRandomBetween(0, services.length - 1)];

      let userServiceExist = userServices.find(
        (userService) =>
          userService.serviceId === serviceId && userService.userId === userId
      );

      let userServicePlatforms: List[] = [];
      if (platforms) {
        for (let platform of platforms) {
          coinFlip() && userServicePlatforms.push(platform);
        }
      }

      !userServiceExist &&
        userServices.push({
          status: true,
          level: igdbId
            ? [
                'Newbie',
                'Moderate',
                'Average',
                'Above Average',
                'Professional',
                'Master',
                'Legend',
              ][getRandomBetween(0, 6)]
            : undefined,
          platforms: userServicePlatforms ?? undefined,
          description: coinFlip() ? faker.lorem.sentences() : undefined,
          price: parseFloat(
            `${getRandomBetween(1, 10)}.${getRandomBetween(0, 99)}`
          ),
          userId,
          image: `${faker.image.imageUrl()}/${faker.datatype.uuid()}`.replace(
            'http://',
            'https://'
          ),
          serviceId,
          per: ['Game', '15 Min', '30 Min', '45 Min', '60 Min'][
            getRandomBetween(0, 4)
          ],
          createdAt: faker.date.recent(),
        });
    }
    // USERLANGUAGES
    for (let x = 0; x < getRandomBetween(1, 4); x++) {
      let { id: languageId, name } =
        languages[getRandomBetween(0, languages.length)];

      let userLangaugeExist = userLanguages.find(
        (userLanguage) =>
          userLanguage.languageId === languageId &&
          userLanguage.userId === userId
      );

      !userLangaugeExist &&
        userLanguages.push({
          name,
          userId,
          languageId,
        });
    }

    log(index + 1, username);
  });
  log('\nData Generated\n');

  log('Create Images');
  await Image.insert(images);
  log('Create User Service');
  await UserService.insert(userServices);
  log('Create User Languages');
  await UserLanguage.insert(userLanguages);

  log('Cleaning up');
};
main();
