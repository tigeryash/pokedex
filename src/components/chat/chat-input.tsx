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
import React, { useEffect, useRef } from "react";
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

  useEffect(() => {
    if (camImage) {
      form.setValue(
        "message",
        "If there is a Pokemon in this image could you tell me who this Pokemon is?"
      );
    }
  }, [camImage, form]);

  const onSubmit = async (data: TFormSchema) => {
    console.log("Form submitted with data:", data); // Add this line
    console.log("camImage:", camImage);
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

    let response;
    if (camImage && typeof camImage === "string") {
      const base64Image = camImage.split(",")[1];
      response = await continueConversation({
        role: "user",
        content: [
          {
            type: "text",
            text: data.message,
          },
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
    setCamImage(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64Image = await resizeFile(file);
      setCamImage(base64Image);
    }
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
                    {camImage ? (
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
                          onClick={() => {
                            setCamImage(null);
                            form.setValue("message", "");
                          }}
                        >
                          <Cross1Icon className="w-2 h-2" />
                        </Button>
                        <p className="text-[#313139] dark:text-[#FEFEFE] text-sm">
                          Ask the Professor about this image?
                        </p>
                      </div>
                    ) : (
                      <Textarea
                        onKeyDown={handleKeyDown}
                        className="w-full p-2 rounded-md text-[#313139] bg-[#FBF7EE] dark:text-[#FEFEFEda] dark:bg-[#45348E] resize-y max-h-[206px]"
                        placeholder="Type a message..."
                        {...field}
                      />
                    )}
                  </>
                </FormControl>
                {!camImage && <FormMessage />}
              </FormItem>
            )}
          />
          <div className="flex gap-2 dark:text-[#E5DA7F]">
            <Button
              className="flex-1 bg-[#164b96]  dark:bg-[#E5DA7F]"
              onClick={() => setShowWebCam(true)}
            >
              <CameraIcon className="dark:text-[#655C14] text-[#fff]" />
            </Button>
            <Button
              className="flex-1 bg-[#164b96] dark:bg-[#E5DA7F]"
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              <ImageIcon className="dark:text-[#655C14] text-[#fff]" />
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
