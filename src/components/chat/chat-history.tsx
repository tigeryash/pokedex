import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import type { UIMessage } from "ai";
import { MessageSquare } from "lucide-react";
import ChatMessage from "./message";

type ChatHistoryProps = {
  messages: UIMessage[];
  isLoading: boolean;
  onRetry: (messageId: string) => Promise<void>;
};

const ChatHistory = ({ messages, isLoading, onRetry }: ChatHistoryProps) => {
  const hasPendingAssistantReply =
    isLoading &&
    messages.length > 0 &&
    messages[messages.length - 1]?.role !== "assistant";

  return (
    <Conversation>
      <ConversationContent>
        {messages.length === 0 ? (
          <ConversationEmptyState
            icon={<MessageSquare className="size-12" />}
            title="Start a conversation"
            description="Type a message below to begin chatting"
          />
        ) : (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} onRetry={onRetry} />
          ))
        )}

        {hasPendingAssistantReply ? (
          <div className="chat chat-start">
            <div className="chat-header">Professor</div>
            <div className="chat-bubble">
              <span className="loading loading-dots loading-sm"></span>
            </div>
          </div>
        ) : null}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  );
};

export default ChatHistory;