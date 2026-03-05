"use client";

import { Button } from "../ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { useRef, useState } from "react";
import { CameraIcon, Cross1Icon, ImageIcon } from "@radix-ui/react-icons";
import webcamStore from "@/stores/webcamstore";
import Image from "next/image";
import { resizeFile } from "@/lib/utils";

interface ChatInputProps {
  isLoading: boolean;
  onSend: (payload: { text: string; imageUrl?: string; mediaType?: string }) => Promise<void>;
}

const ChatInput: React.FC<ChatInputProps> = ({ isLoading, onSend }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState("");
  const camImage = webcamStore((state) => state.camImage);
  const setCamImage = webcamStore((state) => state.setCamImage);
  const setShowWebCam = webcamStore((state) => state.setShowWebCam);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!e.shiftKey) {
        formRef.current?.requestSubmit();
      }
    }
  };

  const inferMediaType = (dataUrl: string) => {
    const match = dataUrl.match(/^data:(.*?);base64,/);
    return match?.[1] ?? "image/jpeg";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const text = camImage
      ? message.trim() || "Please identify the Pokemon in this image."
      : message.trim();

    if (!text && !camImage) {
      return;
    }

    await onSend({
      text,
      imageUrl: camImage ?? undefined,
      mediaType: camImage ? inferMediaType(camImage) : undefined,
    });

    setMessage("");
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
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-2"
        >
          {camImage ? (
            <div className="relative">
              <Image
                src={camImage}
                alt="Captured Pokemon"
                width={128}
                height={128}
                className="rounded-lg"
              />
              <Button
                type="button"
                className="absolute top-1 left-[5.7rem] p-3 hover:bg-red-500"
                onClick={() => {
                  setCamImage(null);
                }}
              >
                <Cross1Icon className="w-2 h-2" />
              </Button>
              <p className="text-[#313139] dark:text-[#FEFEFE] text-sm">
                Ask the Professor about this image?
              </p>
              <p className="text-[#313139] dark:text-[#FEFEFE] text-xs opacity-80">
                If this is the right image, press submit to send it.
              </p>
            </div>
          ) : (
            <Textarea
              onKeyDown={handleKeyDown}
              className="w-full p-2 rounded-md text-[#313139] bg-[#FBF7EE] dark:text-[#FEFEFEda] dark:bg-[#45348E] resize-y max-h-51.5"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              disabled={isLoading}
            />
          )}

          <div className="flex gap-2 dark:text-[#E5DA7F]">
            <Button
              className="flex-1 bg-[#164b96]  dark:bg-[#E5DA7F]"
              onClick={() => setShowWebCam(true)}
              type="button"
            >
              <CameraIcon className="dark:text-[#655C14] text-white" />
            </Button>
            <Button
              className="flex-1 bg-[#164b96] dark:bg-[#E5DA7F]"
              onClick={() => document.getElementById("fileInput")?.click()}
              type="button"
            >
              <ImageIcon className="dark:text-[#655C14] text-white" />
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
            disabled={isLoading || (!camImage && !message.trim())}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : camImage ? (
              "Send image"
            ) : (
              "Submit"
            )}
          </Button>
        </form>
    </>
  );
};

export default ChatInput;
