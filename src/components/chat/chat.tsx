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
import { useUIState } from "ai/rsc";
import { ClientMessage } from "@/app/actions";
import webcamStore from "@/stores/webcamstore";
import WebcamUi from "../webcam-ui";
import Image from "next/image";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [scope, animate] = useAnimate();
  const [messages] = useUIState(); // Removed the incorrect type annotation <UIState[]>

  const showWebCam = webcamStore((state) => state.showWebCam);

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
             p-4 rounded-full bg-[#C2C7C6] dark:bg-[#240E62] border-2 border-[#EE7318] dark:border-[#E5DA7F] overflow-x-hidden"
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

                  <div className="flex-1 overflow-y-auto p-2 bg-[#FBF7EE] dark:bg-[#45348E] w-full rounded-lg text-[#FBF7EE] dark:text-[#E5DA7F] text-sm">
                    {messages.map((msg: ClientMessage) => (
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
                          {msg.display}

                          {msg.image && (
                            <Image
                              src={msg.image}
                              alt="user image"
                              width={200}
                              height={200}
                              className="rounded-lg  mt-2"
                            />
                          )}
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

          {!open && (
            <TooltipContent>
              <p className="hidden md:block">Ask Proffesor</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>

      {showWebCam && <WebcamUi />}
    </>
  );
};

export default Chat;
