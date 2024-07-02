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
import { resizeFile } from "@/lib/utils";

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
      {
        id: nanoid(),
        role: "user",
        display: data.message,
        image: camImage || undefined,
      },
    ]);
    console.log("camImage in onSubmit:", camImage); // Add this line

    let response;
    if (camImage && typeof camImage === "string") {
      const base64Image = camImage.split(",")[1];
      response = await continueConversation({
        role: "user",
        content: [
          { type: "text", text: data.message },
          { type: "image", image: base64Image },
        ],
      });
    } else {
      response = await continueConversation({
        role: "user",
        content: [{ type: "text", text: data.message }],
      });
    }

    setMessages((currConvo: ClientMessage[]) => [...currConvo, response]);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64Image = await resizeFile(file);
      setCamImage(base64Image);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
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
                  <>
                    {camImage && (
                      <div className="relative">
                        <Image
                          src={camImage}
                          alt="webcam"
                          width={128}
                          height={128}
                          className="rounded-lg"
                        />
                        <Button
                          className="absolute top-1 left-[5.7rem] p-3 hover:bg-red-500"
                          onClick={() => setCamImage(null)}
                        >
                          <Cross1Icon className="w-2 h-2" />
                        </Button>
                      </div>
                    )}
                    <Textarea
                      onKeyDown={handleKeyDown}
                      className="w-full p-2 rounded-md text-[#313139] bg-[#FBF7EE] dark:text-[#FEFEFEda] dark:bg-[#45348E] resize-y max-h-[206px]"
                      placeholder="Type a message..."
                      {...field}
                    />
                  </>
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
            <Button
              className="flex-1 bg-[#52525A] dark:bg-[#E5DA7F]"
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              <ImageIcon className="dark:text-[#655C14]" />
            </Button>
            <input
              type="file"
              className="hidden"
              accept="image/jpeg, image/png, image/jpg"
              id="fileInput"
              onChange={handleImageUpload}
            />
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
