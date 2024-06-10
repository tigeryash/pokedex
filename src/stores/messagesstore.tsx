import { create } from "zustand";
import { type CoreMessage } from "ai";

type MessageStore = {
  messages: CoreMessage[];
  setMessages: (messages: CoreMessage[]) => void;
  addMessage: (message: CoreMessage) => void;
};

const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  setMessages: (messages: CoreMessage[]) => set({ messages }),
  addMessage: async (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
}));

export default useMessageStore;
