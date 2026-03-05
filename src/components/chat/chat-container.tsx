"use client";

import { ChatBubbleIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, useAnimate } from "framer-motion";
import ChatInput from "./chat-input";
import webcamStore from "@/stores/webcamstore";
import WebcamUi from "../webcam-ui";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type FileUIPart, type UIMessage } from "ai";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [scope, animate] = useAnimate();

  const showWebCam = webcamStore((state) => state.showWebCam);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const isLoading = status === "submitted" || status === "streaming";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleSend = async ({
    text,
    imageUrl,
    mediaType,
  }: {
    text: string;
    imageUrl?: string;
    mediaType?: string;
  }) => {
    if (!text.trim() && !imageUrl) {
      return;
    }

    const files: FileUIPart[] | undefined = imageUrl
      ? [
          {
            type: "file",
            url: imageUrl,
            mediaType: mediaType ?? "image/jpeg",
          },
        ]
      : undefined;

    await sendMessage({ text, files });
  };

  const getTextFromMessage = (message: UIMessage) => {
    const textParts = message.parts.filter((part) => part.type === "text");
    if (textParts.length === 0) {
      return "";
    }

    return textParts.map((part) => part.text).join("\n");
  };

  useEffect(() => {
    if (open) {
      animate(scope.current, {
        width: innerWidth > 800 ? 800 : innerWidth - innerWidth * 0.09,
        height: innerHeight > 500 ? innerHeight - 200 : innerHeight,
        borderRadius: "1rem",
      });
    }
    if (!open) {
      animate(scope.current, {
        width: 50,
        height: 50,
        borderRadius: "50%",
      });
    }
  }, [open, animate, scope]);

  useEffect(scrollToBottom, [messages, open]);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              ref={scope}
                className={`fixed flex flex-col items-center justify-center text-[#EE7318] dark:text-[#E5DA7F] bottom-4 right-8
              rounded-full bg-[#FBF7EE] dark:bg-[#240E62] border-2 border-[#EE7318] dark:border-[#E5DA7F] overflow-x-hidden 
              ${open ? "w-80 h-96 p-4" : "w-12 h-12"}`}
            >
              {open ? (
                <>
                  <div className="flex justify-between items-center mb-2 w-full">
                    <h2 className="text-lg font-semibold text-[] dark:text-[#FEFEFE]">
                      Professor 🥸
                    </h2>
                    <button
                      onClick={toggleOpen}
                      className="text-lg text-[#EE7318] dark:text-[#FEFEFE]"
                    >
                      <Cross1Icon className="w-6 h-6 text-[#EE7318] dark:text-[#FEFEFE]" />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-2 bg-[#C2C7C6] dark:bg-[#45348E] w-full rounded-lg text-[#FBF7EE] dark:text-[#E5DA7F] text-sm">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`chat ${
                          msg.role === "user" ? "chat-end" : "chat-start"
                        } flex flex-col space-y-2`}
                      >
                        <div className="chat-header">
                          {msg.role === "user" ? "Trainer" : "Professor"}
                        </div>
                        <div className="chat-bubble whitespace-pre-wrap">
                          {getTextFromMessage(msg)}
                        </div>
                        {msg.parts
                          .filter((part) => part.type === "file")
                          .map((part) =>
                            part.mediaType.startsWith("image/") ? (
                              <img
                                key={part.url}
                                src={part.url}
                                alt="Attached by trainer"
                                className="rounded-lg max-w-36 border border-[#313139]/20"
                              />
                            ) : null
                          )}
                      </div>
                    ))}

                    {isLoading &&
                      messages.length > 0 &&
                      messages[messages.length - 1].role !== "assistant" && (
                      <div className="chat chat-start">
                        <div className="chat-header">Professor</div>
                        <div className="chat-bubble">
                          <span className="loading loading-dots loading-sm"></span>
                        </div>
                      </div>
                    )}

                    {messages.length === 0 && (
                      <p className="text-center">{`Ask the Professor about Pokemon. (Ex. "What is Porygon")`}</p>
                    )}
                    <div className="" ref={messagesEndRef} />
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="mt-2 w-full"
                  >
                    <ChatInput 
                      isLoading={isLoading}
                      onSend={handleSend}
                    />
                  </motion.div>
                </>
              ) : (
                <button onClick={toggleOpen} className="flex items-center justify-center w-full h-full">
                  <ChatBubbleIcon  />
                </button>
              )}
            </motion.div>
          </TooltipTrigger>

          {!open && (
            <TooltipContent>
              <p className="hidden md:block">Chat with The Proffesor</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>

      {showWebCam && <WebcamUi />}
    </>
  );
};

export default Chat;
