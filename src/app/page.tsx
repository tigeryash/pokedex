import Chat from "@/components/chat/chat";
import { AI } from "./actions";
import PokemonList from "@/components/pokemonlist/pokemon-list";

export default function Home() {
  return (
    <main className="flex flex-col">
      <PokemonList />
      <AI>
        <Chat />
      </AI>
    </main>
  );
}
