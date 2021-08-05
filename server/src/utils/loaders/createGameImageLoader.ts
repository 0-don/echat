import DataLoader from 'dataloader';
import _ from 'lodash';
import { GameImage } from '../../entity/GameImage';

export const createGameImageLoader = () =>
  new DataLoader<{ gameId: number }, GameImage[]>(async (keys) => {
    const gameImages = await GameImage.find({ where: keys });

    const gs = _.groupBy(gameImages, 'userId');

    const sortedGameImages = keys.map((k) => gs[k.gameId] || []);

    return sortedGameImages;
  });
