import Chat from "@/components/chat/chat";
import PokemonList from "@/components/pokemonlist/pokemon-list";
import Header from "@/components/header/header";
import ThemeToggle from "@/components/theme-toggle";

type HomeProps = {
  params: {
    category: string;
  };
};

export default function Home({ params }: HomeProps) {
  return (
    <>
      <Header />

      <main className="relative flex flex-col pt-5 bg-[#DBE1EA] dark:bg-gray-900 ">
        <PokemonList />
        <ThemeToggle />
        
        <Chat />
       
      </main>
    </>
  );
}
