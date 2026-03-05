import {
  Message,
  MessageAction,
  MessageActions,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import { RefreshCcwIcon } from "lucide-react";
import {
  Attachment,
  AttachmentPreview,
  AttachmentRemove,
  Attachments,
} from "../ai-elements/attachments";

type AttachmentData = {
  id: string;
  type: "file";
  url: string;
  mediaType: string;
};

type ChatMessageProps = {
  message: {
    from: "user" | "assistant";
    content: string;
    attachments?: AttachmentData[];
    versions?: unknown[];
  };
};

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <Message from={message.from}>
      <div>
        {message.attachments && message.attachments.length > 0 && (
          <Attachments className="mb-2" variant="grid">
            {message.attachments.map((attachment) => (
              <Attachment data={attachment} key={attachment.id}>
                <AttachmentPreview />
                <AttachmentRemove />
              </Attachment>
            ))}
          </Attachments>
        )}
        <MessageContent>
          {message.from === "assistant" ? (
            <MessageResponse>{message.content}</MessageResponse>
          ) : (
            message.content
          )}
        </MessageContent>
        {message.from === "assistant" && message.versions && (
          <Actions />
        )}
      </div>
    </Message>
  );
};

export default ChatMessage;

const Actions = () => {
  const handleRetry = () => {};

  return (
    <MessageActions>
      <MessageAction
        label="Retry"
        onClick={handleRetry}
        tooltip="Regenerate response"
      >
        <RefreshCcwIcon className="size-4" />
      </MessageAction>
    </MessageActions>
  );
};