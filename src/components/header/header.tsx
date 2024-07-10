"use client";

import { useEffect, useRef, useState } from "react";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import { motion, AnimatePresence, useTransform } from "framer-motion";
import MenuLink from "./menu-link";
import MobileMenu from "./mobile-menu";
import Search from "../header/search";
import Tags from "../header/tags";
import { useScroll } from "framer-motion";
import { usePokemonStore } from "@/stores/pokemonstore";
import { useInView } from "react-intersection-observer";

const menuLinks = [
  {
    label: "Pokemon",
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
  const targetRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const [clicked, setClicked] = useState(false);
  const [reverse, setReverse] = useState(0);
  const isSticky = usePokemonStore((state) => state.isSticky);
  const setIsSticky = usePokemonStore((state) => state.setIsSticky);

  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start 6%", "start 3%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      if (triggerRef.current && searchRef.current && headerRef.current) {
        const headerRect = triggerRef.current.getBoundingClientRect();
        const searchRect = searchRef.current.getBoundingClientRect();
        const h1Rect = headerRef.current.getBoundingClientRect();

        if (searchRect.top <= headerRect.bottom) {
          setIsSticky(true);
          setReverse(h1Rect.top);
          console.log("sticky");
        } else {
          setIsSticky(false);
          console.log("not sticky");
        }

        if (isSticky && h1Rect.top > reverse) {
          setIsSticky(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setIsSticky, reverse, isSticky]);

  return (
    <>
      {isSticky && (
        <div className="fixed top-0 h-[132px] w-full backdrop-blur-md z-[999]"></div>
      )}
      <header className={` w-full z-[9999] fixed top-0 `}>
        <div
          className={`  flex flex-col justify-between pt-4 w-full ${
            isSticky ? "" : "bg-[#DBE1EA] dark:bg-gray-900"
          } z-9`}
          ref={triggerRef}
        >
          <div className="flex top-0 flex-row w-full justify-between items-center pb-2 px-4">
            <motion.h1
              className="text-2xl font-semibold"
              ref={targetRef}
              style={{ opacity }}
            >
              YashDex
            </motion.h1>

            <HamburgerMenuIcon
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-8 h-8 ml-auto md:hidden"
            />

            <nav className="hidden md:flex ml-auto">
              {/*desktop menu */}
              <ul className="flex space-x-4">
                {menuLinks.map((link) => (
                  <li key={link.href}>
                    <MenuLink
                      label={link.label}
                      href={link.href}
                      setIsMenuOpen={setIsMenuOpen}
                    />
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <MobileMenu
              menuLinks={menuLinks}
              setIsMenuOpen={setIsMenuOpen}
              isMenuOpen={isMenuOpen}
            />
          )}
        </AnimatePresence>
      </header>

      <div
        className={`pt-16 flex flex-col justify-between items-center space-y-4 w-full pb-6`}
      >
        <h1
          className={`text-2xl font-semibold ${
            isSticky ? "invisible " : "visible"
          }`}
          id="iheader"
          ref={headerRef}
        >
          YashDex
        </h1>
      </div>
      <div
        className={`flex flex-col space-y-4 justify-center w-full z-[9999] ${
          isSticky ? "fixed top-14" : "relative"
        }`}
        ref={searchRef}
      >
        <Search />
        <Tags />
      </div>
    </>
  );
};

export default Header;
