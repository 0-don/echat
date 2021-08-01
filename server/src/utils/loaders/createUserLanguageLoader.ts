import DataLoader from 'dataloader';
import _ from 'lodash';
import { UserLanguage } from '../../entity/UserLanguage';

export const createUserLanguageLoader = () =>
  new DataLoader<{ userId: number }, UserLanguage[]>(async (keys) => {
    const userLanguages = await UserLanguage.find({ where: keys });

    const gs = _.groupBy(userLanguages, 'userId');

    const sortedUserLanguages = keys.map((k) => gs[k.userId] || []);

    return sortedUserLanguages;
  });
