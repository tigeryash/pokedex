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
import useMessageStore from "@/stores/messagesstore";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useRef } from "react";
import { CameraIcon, ImageIcon } from "@radix-ui/react-icons";
import { continueConversation } from "@/app/actions";
import { readStreamableValue } from "ai/rsc";
import { CoreMessage } from "ai";

const ChatInput = () => {
  const setMessages = useMessageStore((state) => state.setMessages);
  const messages = useMessageStore((state) => state.messages);
  const formRef = useRef<HTMLFormElement>(null);

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
    const newMessages: CoreMessage[] = [
      ...messages,
      { content: data.message, role: "user" },
    ];

    // Reset the form
    form.reset({ message: "" });

    // Continue the conversation with the updated messages
    const result = await continueConversation(newMessages);

    // Read the assistant's response and update the messages state
    for await (const content of readStreamableValue(result)) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: content as string },
      ]);
    }
  };

  return (
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
                <Textarea
                  onKeyDown={handleKeyDown}
                  className="w-full p-2 rounded-md text-black bg-white resize-y max-h-[206px]"
                  placeholder="Type a message..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button className="flex-1 bg-blue-600">
            <CameraIcon />
          </Button>
          <Button className="flex-1 bg-green-600">
            <ImageIcon />
          </Button>
        </div>

        <Button className="w-full bg-slate-200 text-black" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ChatInput;
