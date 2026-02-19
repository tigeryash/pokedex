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
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useRef, useState } from "react";
import { CameraIcon, Cross1Icon, ImageIcon } from "@radix-ui/react-icons";
import webcamStore from "@/stores/webcamstore";
import Image from "next/image";
import { resizeFile } from "@/lib/utils";

interface ChatInputProps {
  onSubmit: (input: string) => Promise<void>;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSubmit, isLoading }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [input, setInput] = useState("");
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
      setInput("If there is a Pokemon in this image could you tell me who this Pokemon is?");
    }
  }, [camImage, form]);

  const handleSubmit = async (data: TFormSchema) => {
    await onSubmit(data.message);
    form.reset({ message: "" });
    setInput("");
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
          onSubmit={form.handleSubmit(handleSubmit)}
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
                            setInput("");
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
                        value={input}
                        onChange={(e) => {
                          field.onChange(e);
                          setInput(e.target.value);
                        }}
                        disabled={isLoading}
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
              type="button"
            >
              <CameraIcon className="dark:text-[#655C14] text-[#fff]" />
            </Button>
            <Button
              className="flex-1 bg-[#164b96] dark:bg-[#E5DA7F]"
              onClick={() => document.getElementById("fileInput")?.click()}
              type="button"
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
            disabled={isLoading}
          >
            {isLoading ? <span className="loading loading-spinner loading-sm"></span> : "Submit"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ChatInput;
