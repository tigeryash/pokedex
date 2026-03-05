"use client";

import {
  Message,
  MessageAction,
  MessageActions,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import type { UIMessage } from "ai";
import { RefreshCcwIcon } from "lucide-react";
import { useState } from "react";
import {
  Attachment,
  AttachmentPreview,
  Attachments,
} from "../ai-elements/attachments";
import { useChat } from "@ai-sdk/react";

type ChatMessageProps = {
  message: UIMessage;
  onRetry: (messageId: string) => Promise<void>;
};

const ChatMessage = ({ message, onRetry }: ChatMessageProps) => {
  const text = getMessageText(message);
  const attachments = getMessageAttachments(message);

  const from = message.role === "assistant" || message.role === "user"
    ? message.role
    : "assistant";

  return (
    <Message from={from}>
      <div>
        <MessageAttachments attachments={attachments} />
        <MessageBody from={from} text={text} />
        {from === "assistant" ? (
          <Actions messageId={message.id} onRetry={onRetry} />
        ) : null}
      </div>
    </Message>
  );
};

export default ChatMessage;

type ChatRole = "user" | "assistant";

type MessageBodyProps = {
  from: ChatRole;
  text: string;
};

const MessageBody = ({ from, text }: MessageBodyProps) => (
  <MessageContent>
    {from === "assistant" ? <MessageResponse>{text}</MessageResponse> : text}
  </MessageContent>
);

type MessageAttachmentsProps = {
  attachments: FilePart[];
};

const MessageAttachments = ({ attachments }: MessageAttachmentsProps) => {
  if (attachments.length === 0) {
    return null;
  }

  return (
    <Attachments className="mb-2" variant="grid">
      {attachments.map((attachment) => (
        <Attachment data={toAttachmentData(attachment)} key={attachment.url}>
          <AttachmentPreview />
        </Attachment>
      ))}
    </Attachments>
  );
};

type FilePart = Extract<UIMessage["parts"][number], { type: "file" }>;
type TextPart = Extract<UIMessage["parts"][number], { type: "text" }>;

const getMessageText = (message: UIMessage) =>
  message.parts
    .filter((part): part is TextPart => part.type === "text")
    .map((part) => part.text)
    .join("\n");

const getMessageAttachments = (message: UIMessage): FilePart[] =>
  message.parts.filter(
    (part): part is FilePart => part.type === "file" && Boolean(part.url)
  );

const toAttachmentData = (part: FilePart) => ({
  ...part,
  id: String(part.url),
});

type ActionsProps = {
  messageId: string;
  onRetry: (messageId: string) => Promise<void>;
};

const Actions = ({ messageId, onRetry }: ActionsProps) => {
  
  const {regenerate, status} = useChat()
  const handleRetry = async () => {
    regenerate({messageId})
  };

  return (
    <MessageActions>
      <MessageAction
        disabled={status === "submitted" || status === "streaming"}
        className={`${status === "submitted" || status === "streaming" ? "cursor-not-allowed hidden" : "" }`}
        label="Retry"
        onClick={handleRetry}
        tooltip="Regenerate response"
      >
        <RefreshCcwIcon className="size-4" />
      </MessageAction>
    </MessageActions>
  );
};