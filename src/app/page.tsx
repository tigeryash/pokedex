import Chat from "@/components/chat/chat";
import { AI } from "./actions";
import PokemonList from "@/components/pokemonlist/pokemon-list";

type HomeProps = {
  params: {
    category: string;
  };
};

export default function Home({ params }: HomeProps) {
  return (
    <main className=" flex flex-col">
      <PokemonList params={params} />
      <AI>
        <Chat />
      </AI>
    </main>
  );
}
