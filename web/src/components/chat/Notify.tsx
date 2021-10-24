import {
  GetRoomsDocument,
  GetRoomsQuery,
  GetRoomsQueryVariables,
  useMeQuery,
  useMessageSentSubscription,
} from 'src/generated/graphql';
import { useApolloClient } from '@apollo/client';
import produce from 'immer';
import { useEffect } from 'react';
import useChatStore from 'src/store/ChatStore';

interface ChatNotifyProps {
  currentChannel: string;
}

export const Notify: React.FC<ChatNotifyProps> = ({ currentChannel }) => {
  const { cache } = useApolloClient();
  const { data: msg } = useMessageSentSubscription({
    variables: { channel: currentChannel },
  });
  const { channel } = useChatStore();
  const { data: me } = useMeQuery();
  const meId = me?.me?.id;

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
        if (
          room &&
          meId !== msg.messageSent.userId &&
          channel !== room.channel
        ) {
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
