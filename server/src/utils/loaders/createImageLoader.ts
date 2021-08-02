import DataLoader from 'dataloader';
import { Image } from '../../entity/Image';
import _ from 'lodash';

export const createImageLoader = () =>
  new DataLoader<{ userId: number }, Image[]>(async (keys) => {
    const images = await Image.find({ where: keys });

    const gs = _.groupBy(images, 'userId');
  
    const sortedImages = keys.map((k) => gs[k.userId] || []);

    return sortedImages;
  });
