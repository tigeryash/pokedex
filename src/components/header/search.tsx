"use client";

import { Form, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { FormControl, FormField, FormItem } from "../ui/form";
import { forwardRef, useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import pokemon from "../../lib/pokemon.json";
import Link from "next/link";
import Image from "next/image";

const searchSchema = z.object({
  message: z.string().min(1),
});

const Search = forwardRef<HTMLDivElement, any>((props, ref) => {
  const router = useRouter();
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [query] = useDebounce(text, 400);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      message: "",
    },
  });

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      inputRef.current &&
      suggestionsRef.current &&
      !inputRef.current.contains(event.target as Node) &&
      !suggestionsRef.current.contains(event.target as Node)
    ) {
      setSuggestions([]); // Hide suggestions when clicking outside the input and suggestions
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && text.length > 0) {
      e.preventDefault();
      if (!e.shiftKey) {
        router.push(`/${query}`);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value; // Get the latest input value

    setText(e.target.value);

    if (searchText.length > 0) {
      const filteredSuggestions = Object.keys(pokemon).filter((key) =>
        key.toLowerCase().startsWith(searchText.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const onSubmit = async (data: z.infer<typeof searchSchema>) => {
    form.reset({ message: "" });
    router.push(`/pokemon?query=${query}`);
  };

  return (
    <div
      className="flex items-center rounded-full w-[90%] md:w-[600px] lg:w-[800px] mx-auto px-8 relative"
      ref={ref}
    >
      <Input
        ref={inputRef}
        onKeyDown={handleKeyDown}
        className="w-full p-2 dark:text-[#e5da7f] rounded-full focus:bg-[#FBF7EE]   dark:focus:bg-gray-900"
        placeholder="Search for a Pokemon"
        onChange={handleChange}
      />
      {suggestions.length > 0 && text.length > 0 && (
        <div
          className="absolute top-10 max-h-[500px] bg-[#FBF7EE] border-2 border-[#0dade8] dark:border-[#fafcfd]  dark:bg-[#1e1e1e] left-auto w-[75%] sm:w-[90%] md:w-[90%] overflow-y-auto z-20 right-auto rounded-md"
          ref={suggestionsRef}
        >
          {suggestions.map((suggestion, idx) => (
            <div
              className={`flex items-center gap-2  dark:border-[#E5DA7F] ${
                idx % 2 === 0 ? "bg-[#C2C7C6] dark:bg-[#45348E]" : ""
              }`}
              key={suggestion}
            >
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  pokemon[suggestion as keyof typeof pokemon]
                }.png`}
                alt={suggestion}
                width={72}
                height={72}
                className="w-16 h-16"
              />
              <Link
                href={`/${pokemon[suggestion as keyof typeof pokemon]}`}
                className="capitalize"
              >
                {suggestion}
              </Link>
            </div>
          ))}
        </div>
      )}
      <Button className="rounded-full absolute right-8 top-0" type="submit">
        <MagnifyingGlassIcon className="w-4 h-4" />
      </Button>
    </div>
  );
});

Search.displayName = "Search";

export default Search;
