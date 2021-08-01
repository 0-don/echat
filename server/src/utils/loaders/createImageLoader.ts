import DataLoader from 'dataloader';
import { Image } from '../../entity/Image';
import _ from 'lodash';

export const createImageLoader = () =>
  new DataLoader<{ userId: number }, Image[]>(async (keys) => {
    console.log(keys);
    const images = await Image.find({ where: keys });
    // console.log(images)
    const userIdToImage: Record<number, Image> = {};

    images.forEach((u) => {
      userIdToImage[u.id] = u;
    });
    // console.log(1, userIdToImage);
    // const sortedImages = keys.map(({ userId }) => {
    //   // console.log(userIdToImage[userId]);
    //   return userIdToImage[userId];
    // });
    const gs = _.groupBy(images, 'userId');
    const sortImages = keys.map(k => gs[k.userId] || []);
    sortImages
    // console.log(gs, sortImages)
    console.log(sortImages)
    // console.log(2, userIdToImage);
    // console.log(sortedImages);

    return sortImages;
  });
