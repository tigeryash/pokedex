"use client";

import { Input } from "../ui/input";
import {  useEffect, useRef, useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import pokemon from "../../lib/pokemon.json";
import Link from "next/link";
import Image from "next/image";



const SearchInput = () => {
  const router = useRouter();
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [query] = useDebounce(text, 400);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  

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
        const params = new URLSearchParams(window.location.search);
        params.set("q", query);
        params.delete("page");
        router.push(`?${params.toString()}`);
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


  return (
    <form
      className="flex grow-0 shrink-0 w-[45%] lg:w-[35%] items-center gap-3 rounded-full border
       border-black/10 bg-white/5  transition-all duration-200 relative"
    >
      <Input
        ref={inputRef}
        onKeyDown={handleKeyDown}
        className="w-full dark:text-[#e5da7f] rounded-full focus:bg-[#FBF7EE] xl:text-[1rem]  dark:focus:bg-gray-900"
        placeholder="Search for a Pokemon"
        onChange={handleChange}
      />
      {suggestions.length > 0 && text.length > 0 && (
        <div
          className="absolute top-10 max-h-[500px] bg-[#FBF7EE] border-2 border-[#0dade8] dark:border-[#fafcfd]  dark:bg-[#1e1e1e] left-auto w-[75%] sm:w-[90%] md:w-[90%] overflow-y-auto z-99 right-auto rounded-md"
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
                onClick={() => {
                  setText("");
                  setSuggestions([]);
                }}
                className="capitalize"
              >
                {suggestion}
              </Link>
            </div>
          ))}
        </div>
      )}
    </form>
  );
}

SearchInput.displayName = "Search";

export default SearchInput;
