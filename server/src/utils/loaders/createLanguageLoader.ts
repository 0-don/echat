import DataLoader from 'dataloader';
import _ from 'lodash';
import { Language } from '../../entity/Language';

export const createLanguageLoader = () =>
  new DataLoader<{ userId: number }, Language[]>(async (keys) => {
    const userLanguages = await Language.find({ where: keys });

    const gs = _.groupBy(userLanguages, 'userId');

    const sortedUserLanguages = keys.map((k) => gs[k.userId] || []);

    return sortedUserLanguages;
  });
