import DataLoader from 'dataloader';
import { User } from '../../entity/User';

export const createUserLoader = () =>
  new DataLoader<number, User>(async (userIds) => {
    const users = await User.findByIds(userIds as number[]);

    const userIdToUser: Record<number, User> = {};

    users.forEach((u) => {
      userIdToUser[u.id] = u;
    });
    // console.log(userIdToUser);
    const sortedUsers = userIds.map((userId) => userIdToUser[userId]);
    // console.log(sortedUsers);
    return sortedUsers;
  });
