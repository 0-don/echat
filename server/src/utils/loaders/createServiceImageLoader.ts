import DataLoader from 'dataloader';
import _ from 'lodash';
import { ServiceImage } from '../../entity/ServiceImage';

export const createServiceImageLoader = () =>
  new DataLoader<{ serviceId: number }, ServiceImage[]>(async (keys) => {
    const serviceImages = await ServiceImage.find({ where: keys });
    const gs = _.groupBy(serviceImages, 'serviceId');

    const sortedServiceImages = keys.map((k) => gs[k.serviceId] || []);
    return sortedServiceImages;
  });
