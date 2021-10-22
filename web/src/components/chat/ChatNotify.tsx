import {
  GetRoomsDocument,
  GetRoomsQuery,
  GetRoomsQueryVariables,
  useMessageSentSubscription,
} from 'src/generated/graphql';
import { useApolloClient } from '@apollo/client';
import produce from 'immer';
import { useEffect } from 'react';

interface ChatNotifyProps {
  channel: string;
}

export const ChatNotify: React.FC<ChatNotifyProps> = ({ channel }) => {
  const { cache } = useApolloClient();
  const { data: msg } = useMessageSentSubscription({
    variables: { channel },
  });

  useEffect(() => {
    const rooms = cache.readQuery<GetRoomsQuery, GetRoomsQueryVariables>({
      query: GetRoomsDocument,
      returnPartialData: true,
    });

    if (msg && rooms) {
      const newState = produce(rooms, (draft) => {
        const room = draft.getRooms?.find(
          (room) => room.id === msg.messageSent.roomId
        );
        if (room) {
          room.lastMessageDate = msg.messageSent.createdAt;
          room.newMessage = msg.messageSent.message;
          room.newMessagesCount = 1 + (room?.newMessagesCount || 0);
        }
      });

      cache.writeQuery<GetRoomsQuery, GetRoomsQueryVariables>({
        query: GetRoomsDocument,
        data: { ...newState },
        overwrite: true,
      });
    }
  }, [msg]);

  return <></>;
};
