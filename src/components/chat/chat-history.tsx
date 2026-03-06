import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { cn } from "@/lib/utils";
import type { UIMessage } from "ai";
import { MessageSquare } from "lucide-react";
import ChatMessage from "./message";

type ChatHistoryProps = {
  className?: string;
  messages: UIMessage[];
  onRetry: (messageId: string) => Promise<void>;
};

const ChatHistory = ({ className, messages, onRetry }: ChatHistoryProps) => {

  return (
    <Conversation className={cn("h-full", className)}>
      <ConversationContent className="gap-4 p-2">
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

      
        
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  );
};

export default ChatHistory;