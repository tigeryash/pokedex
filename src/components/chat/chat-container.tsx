"use client";

import { ChatBubbleIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
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
import { DefaultChatTransport, type FileUIPart } from "ai";
import ChatHistory from "./chat-history";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [scope, animate] = useAnimate();

  const showWebCam = webcamStore((state) => state.showWebCam);

  const { messages, sendMessage, regenerate, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const isLoading = status === "submitted" || status === "streaming";

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

  const handleRetry = async (messageId: string) => {
    await regenerate({ messageId });
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

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              ref={scope}
                className={`fixed z-5 flex flex-col items-center justify-center text-[#EE7318] dark:text-[#E5DA7F] bottom-4 right-8
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
                    <ChatHistory
                      isLoading={isLoading}
                      messages={messages}
                      onRetry={handleRetry}
                    />
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
