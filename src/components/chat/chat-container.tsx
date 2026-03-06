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
import { DefaultChatTransport, type FileUIPart } from "ai";
import ChatHistory from "./chat-history";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [scope, animate] = useAnimate();
  const chatPanelRef = useRef<HTMLDivElement>(null);
  const previousFocusedElementRef = useRef<HTMLElement | null>(null);

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

  useEffect(() => {
    if (!open) {
      previousFocusedElementRef.current?.focus();
      return;
    }

    previousFocusedElementRef.current = document.activeElement as HTMLElement | null;

    const panel = chatPanelRef.current;
    if (!panel) {
      return;
    }

    const focusableSelector =
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const focusable = Array.from(
      panel.querySelectorAll<HTMLElement>(focusableSelector)
    );

    const initialFocus =
      panel.querySelector<HTMLElement>("textarea:not([disabled])") ?? focusable[0];
    initialFocus?.focus();

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const tabbable = Array.from(
        panel.querySelectorAll<HTMLElement>(focusableSelector)
      );

      if (tabbable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = tabbable[0];
      const last = tabbable[tabbable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (!active || !panel.contains(active)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
        return;
      }

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
        return;
      }

      if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              ref={scope}
              aria-label={open ? "Professor chat" : undefined}
              aria-modal={open ? true : undefined}
              className={`fixed z-5 flex flex-col items-center justify-center text-[#EE7318] dark:text-[#E5DA7F] bottom-4 right-4 lg:right-8
              rounded-full bg-[#FBF7EE] dark:bg-[#240E62] border-2 border-[#EE7318] dark:border-[#E5DA7F] overflow-x-hidden 
              ${open ? "w-80 h-96 p-4" : "w-12 h-12"}`}
              role={open ? "dialog" : undefined}
            >
              {open ? (
                <div ref={chatPanelRef} className="flex h-full w-full flex-col">
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

                  <div className="min-h-0 flex-1 bg-[#C2C7C6] dark:bg-[#45348E] w-full rounded-lg text-[#FBF7EE] dark:text-[#E5DA7F] text-sm">
                    <ChatHistory
                      className="h-full"
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
                </div>
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
