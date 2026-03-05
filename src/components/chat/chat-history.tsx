import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { useChat } from "@ai-sdk/react";
import { MessageSquare } from "lucide-react";
import ChatMessage from "./message";
import { Fragment } from "react/jsx-runtime";

const ChatHistory = () => {
    const { messages } = useChat();
  return (
    <Conversation>
  <ConversationContent>
    {messages.length === 0 ? (
              <ConversationEmptyState
                icon={<MessageSquare className="size-12" />}
                title="Start a conversation"
                description="Type a message below to begin chatting"
              />) : (
                messages.map((message, idx) => (
                    <Fragment key={idx}>
                     <ChatMessage message={message} />
                    </Fragment>
                ))
            )}
  </ConversationContent>
  <ConversationScrollButton />
</Conversation>
  )
}

export default ChatHistory