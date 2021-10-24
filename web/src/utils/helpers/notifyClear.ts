import produce from 'immer';
import {
  GetRoomsQuery,
  GetRoomsQueryVariables,
  GetRoomsDocument,
} from 'src/generated/graphql';
import { cache } from 'src/utils/apollo/withApollo';

export const notifyClear = (channel: string) => {
  const rooms = cache.readQuery<GetRoomsQuery, GetRoomsQueryVariables>({
    query: GetRoomsDocument,
    returnPartialData: true,
  });

  if (rooms) {
    const newState = produce(rooms, (draft) => {
      const room = draft.getRooms?.find((room) => room.channel === channel);

      room?.lastMessageDate && (room.lastMessageDate = null);
      room?.newMessage && (room.newMessage = null);
      room?.newMessagesCount && (room.newMessagesCount = 0);
    });

    cache.writeQuery<GetRoomsQuery, GetRoomsQueryVariables>({
      query: GetRoomsDocument,
      data: { ...newState },
      overwrite: true,
    });
  }
};
