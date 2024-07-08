import Chat from "@/components/chat/chat";
import { AI } from "./actions";
import PokemonList from "@/components/pokemonlist/pokemon-list";
import Header from "@/components/header/header";

type HomeProps = {
  params: {
    category: string;
  };
};

export default function Home({ params }: HomeProps) {
  return (
    <>
      <Header />

      <main className=" flex flex-col pt-[10px]">
        <PokemonList params={params} />
        <AI>
          <Chat />
        </AI>
      </main>
    </>
  );
}
