import Chat from "@/components/chat/chat";
import { AI } from "./actions";
import PokemonList from "@/components/pokemonlist/pokemon-list";
import Header from "@/components/header/header";
import ThemeToggle from "@/components/theme-toggle";
import { Suspense } from "react";
import ListSkeleton from "@/components/pokemonlist/list-skeleton";

type HomeProps = {
  params: {
    category: string;
  };
};

export default function Home({ params }: HomeProps) {
  return (
    <>
      <Header />

      <main className="relative flex flex-col pt-[20px]">
        <PokemonList />
        <ThemeToggle />
        <AI>
          <Chat />
        </AI>
      </main>
    </>
  );
}
