"use client";

import { Form, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { FormControl, FormField, FormItem } from "../ui/form";
import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const searchSchema = z.object({
  message: z.string().min(1),
});

const Search = () => {
  const router = useRouter();
  const [text, setText] = useState("");
  const [query] = useDebounce(text, 500);

  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      message: "",
    },
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!e.shiftKey) {
        router.push(`/pokemon?query=${query}`);
      }
    }
  };

  const onSubmit = async (data: z.infer<typeof searchSchema>) => {
    form.reset({ message: "" });
    router.push(`/pokemon?query=${query}`);
  };

  return (
    <div className="flex items-center rounded-full w-full px-8 relative">
      <Input
        onKeyDown={handleKeyDown}
        className="w-full p-2 text-black rounded-full"
        placeholder="Search for a Pokemon"
        onChange={(e) => setText(e.target.value)}
      />
      <Button className="rounded-full absolute right-8 top-0" type="submit">
        <MagnifyingGlassIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default Search;
