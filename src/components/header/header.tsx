
"use client"
import LanguageSelect from "./language-select";
import SearchInput from "./search-input";
import MobileMenu from "./mobile-menu";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import MenuLink from "./menu-link";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

const links = [
  {
    label: "Pokémon",
    href: "/",
  },
  {
    label: "Items",
    href: "/items",
  },
  {
    label: "Moves",
    href: "/moves",
  },
];



const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="flex items-center justify-around space-x-2 sm:justify-between h-20 border-b 
     border-white/10 z-10 px-2 md:px-10 lg:px-24 sticky top-0 w-full bg-black/20 backdrop-blur-2xl" >
      <div className="flex items-center gap-3 text-[1.2rem] font-extrabold tracking-[-0.02em] " >
        YASHDEX
      </div>

    
      <SearchInput />

      <nav className="hidden lg:flex gap-8 " >
        {links.map((link) => (
        <MenuLink key={link.href} label={link.label} href={link.href}/>
    ))}
      </nav>

      <LanguageSelect />

      <HamburgerMenuIcon
            onClick={() => setOpen(!open)}
            className="w-8 h-8 lg:hidden"
      />

      <AnimatePresence mode="wait" initial={false}>
        {open && (
          <MobileMenu isMenuOpen={open} setIsMenuOpen={setOpen} links={links} />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
