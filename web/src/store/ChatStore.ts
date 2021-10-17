import { immer } from '../utils/immer';
import create from 'zustand';

type ChatStore = {
  chatPopup: boolean;
  channel: string;
  switchChatPopup: () => void;
  setChannel: (newChannel: string) => void;

};

const useChatStore = create<ChatStore>(
  immer(
    (set): ChatStore => ({
      chatPopup: false,
      channel: '5208',
      switchChatPopup: () =>
        set((state) => void (state.chatPopup = !state.chatPopup)),
      setChannel: (newChannel) =>
        set((state) => void (state.channel = newChannel)),
    })
  )
);

export default useChatStore;
