import DataLoader from 'dataloader';
import { Schedule } from '../../entity/Schedule';
import _ from 'lodash';

export const createScheduleLoader = () =>
  new DataLoader<{ userId: number }, Schedule[]>(async (keys) => {
    const schedules = await Schedule.find({ where: keys });

    const gs = _.groupBy(schedules, 'userId');
  
    const sortedSchedules = keys.map((k) => gs[k.userId] || []);

    return sortedSchedules;
  });
