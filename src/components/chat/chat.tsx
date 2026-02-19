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

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [scope, animate] = useAnimate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const showWebCam = webcamStore((state) => state.showWebCam);
  const camImage = webcamStore((state) => state.camImage);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleSubmit = async (input: string) => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";

      const assistantMessageObj: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
      };

      setMessages((prev) => [...prev, assistantMessageObj]);

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        assistantMessage += chunk;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessageObj.id
              ? { ...m, content: assistantMessage }
              : m
          )
        );
      }
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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
              className="fixed flex flex-col items-center justify-center text-[#EE7318] dark:text-[#E5DA7F] bottom-4 right-3
             p-4 rounded-full bg-[#FBF7EE] dark:bg-[#240E62] border-2 border-[#EE7318] dark:border-[#E5DA7F] overflow-x-hidden"
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
                        <div className="chat-bubble">
                          {msg.content}
                        </div>
                      </div>
                    ))}

                    {isLoading && messages.length > 0 && messages[messages.length - 1].role !== "assistant" && (
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
                      onSubmit={handleSubmit}
                      isLoading={isLoading}
                    />
                  </motion.div>
                </>
              ) : (
                <ChatBubbleIcon onClick={toggleOpen} />
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
