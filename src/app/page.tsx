import Chat from "@/components/chat/chat-container";
import PokemonList from "@/components/pokemonlist/pokemon-list";
import Header from "@/components/header/header";
import ThemeToggle from "@/components/theme-toggle";
import PokemonFilters from "@/components/pokemonlist/pokemon-filters";

type HomeProps = {
  params: {
    category: string;
  };
};

export default function Home({ params }: HomeProps) {
  return (
    <>
      <Header />

      <main className="relative flex flex-col pt-5 bg-[#DBE1EA] dark:bg-zinc-950 bg-blueprint min-h-screen">
        <div className="max-w-[1400px] w-full mx-auto px-4 pb-10">
          <PokemonFilters />
          <PokemonList />
        </div>
        <ThemeToggle />
        
        <Chat />
       
      </main>
    </>
  );
}
