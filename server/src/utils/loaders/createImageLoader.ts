import DataLoader from 'dataloader';
import { Image } from '../../entity/Image';

// [1, 78, 8, 9]
export const createImageLoader = () =>
  new DataLoader<{ userId: number }, Image>(async (keys) => {
    const images = await Image.findByIds(keys as any);
    const userIdToImage: Record<number, Image> = {};
    images.forEach((u) => {
      userIdToImage[u.id] = u;
    });

    const sortedImages = keys.map(({ userId }) => userIdToImage[userId]);
    return sortedImages;
  });
