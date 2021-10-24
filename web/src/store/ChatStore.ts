import { immer } from '../utils/immer';
import create from 'zustand';

type ChatStore = {
  newMessagesCount: number;
  chatPopup: boolean;
  channel: string;
  switchChatPopup: () => void;
  setChannel: (newChannel: string) => void;
  setNewMessagesCount: (count: number) => void;
};

const useChatStore = create<ChatStore>(
  immer(
    (set): ChatStore => ({
      newMessagesCount: 0,
      chatPopup: false,
      channel: '',
      switchChatPopup: () =>
        set((state) => void (state.chatPopup = !state.chatPopup)),
      setChannel: (newChannel) =>
        set((state) => void (state.channel = newChannel)),
      setNewMessagesCount: (count: number) =>
        set((state) => void (state.newMessagesCount = count)),
    })
  )
);

export default useChatStore;
