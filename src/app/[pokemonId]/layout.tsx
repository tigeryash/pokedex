import Chat from "@/components/chat/chat"
import Header from "@/components/header/header"
import ThemeToggle from "@/components/theme-toggle"

const PokemonIdLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
        <Header />
        {children}
        <ThemeToggle />
        
        <Chat />
    </>
  )
}

export default PokemonIdLayout