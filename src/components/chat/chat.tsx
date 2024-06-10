"use client";

import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, useAnimate } from "framer-motion";
import ChatInput from "./chat-input";
import useMessageStore from "@/stores/messagesstore";

const Chat = () => {
  const [open, setOpen] = useState(true);
  const [scope, animate] = useAnimate();
  const messages = useMessageStore((state) => state.messages);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (open) {
      animate(scope.current, {
        width: innerWidth - 90,
        height: 500,
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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            ref={scope}
            className="absolute flex flex-col items-center justify-center text-white bottom-4 right-3
             p-4 rounded-full bg-black"
          >
            {open ? (
              <>
                <div className="flex justify-between items-center mb-2 w-full">
                  <h2 className="text-lg font-semibold">Professor 🥸</h2>
                  <button onClick={toggleOpen} className="text-lg">
                    ✖️
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-2 bg-slate-200 w-full rounded-lg text-black text-sm">
                  {messages.map((msg, idx) => (
                    <div
                      key={`${msg.content}-${idx}`}
                      className={`chat ${
                        msg.role === "user" ? "chat-end" : "chat-start"
                      }`}
                    >
                      <div className="chat-header">
                        {msg.role === "user" ? "Trainer" : "Professor"}
                      </div>
                      <div className="chat-bubble">
                        {typeof msg.content === "string"
                          ? msg.content
                          : JSON.stringify(msg.content)}
                      </div>
                    </div>
                  ))}

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
                  <ChatInput />
                </motion.div>
              </>
            ) : (
              <ChatBubbleIcon onClick={toggleOpen} />
            )}
          </motion.div>
        </TooltipTrigger>

        <TooltipContent>
          <p>Ask Proffesor</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Chat;
