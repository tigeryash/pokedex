"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { TFormSchema, formSchema } from "@/types/message-type";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import React, { useRef } from "react";
import { CameraIcon, Cross1Icon, ImageIcon } from "@radix-ui/react-icons";
import { ClientMessage } from "@/app/actions";
import { useActions, useUIState } from "ai/rsc";
import { nanoid } from "ai";
import webcamStore from "@/stores/webcamstore";
import Image from "next/image";

const ChatInput = () => {
  const { continueConversation } = useActions();
  const [messages, setMessages] = useUIState();
  const formRef = useRef<HTMLFormElement>(null);
  const camImage = webcamStore((state) => state.camImage);
  const setCamImage = webcamStore((state) => state.setCamImage);

  const setShowWebCam = webcamStore((state) => state.setShowWebCam);

  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!e.shiftKey) {
        formRef.current?.requestSubmit();
      }
    }
  };

  const onSubmit = async (data: TFormSchema) => {
    form.reset({ message: "" });
    setMessages((currConvo: ClientMessage[]) => [
      ...currConvo,
      { id: nanoid(), role: "user", display: data.message },
    ]);

    const response = await continueConversation(data.message);

    setMessages((currConvo: ClientMessage[]) => [...currConvo, response]);
  };

  return (
    <>
      <Form {...form}>
        <form
          ref={formRef}
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {camImage ? (
                    <div className="relative">
                      <Image
                        src={camImage}
                        alt="webcam"
                        width={512}
                        height={512}
                        className="rounded-lg"
                      />
                      <Button
                        className="absolute top-2 right-2"
                        onClick={() => setCamImage(null)}
                      >
                        <Cross1Icon className="w-2 h-2" />
                      </Button>
                    </div>
                  ) : (
                    <Textarea
                      onKeyDown={handleKeyDown}
                      className="w-full p-2 rounded-md text-[#313139] bg-[#FBF7EE] dark:text-[#FEFEFEda] dark:bg-[#45348E] resize-y max-h-[206px]"
                      placeholder="Type a message..."
                      {...field}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2 ">
            <Button
              className="flex-1 bg-[#52525A] dark:bg-[#E5DA7F]"
              onClick={() => setShowWebCam(true)}
            >
              <CameraIcon className="dark:text-[#655C14]" />
            </Button>
            <Button className="flex-1 bg-[#52525A] dark:bg-[#E5DA7F]">
              <ImageIcon className="dark:text-[#655C14]" />
            </Button>
          </div>

          <Button
            className="w-full bg-[#EFE85A] dark:bg-[#6046D8] text-[#313139] dark:text-[#FEFEFE]"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ChatInput;
