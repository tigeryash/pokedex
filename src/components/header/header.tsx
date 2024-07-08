"use client";

import { useEffect, useRef, useState } from "react";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import { motion, AnimatePresence, useTransform } from "framer-motion";
import MenuLink from "./menu-link";
import MobileMenu from "./mobile-menu";
import Search from "../header/search";
import Tags from "../header/tags";
import { useScroll } from "framer-motion";

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
  const searchRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start 6%", "start 3%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 0.07; // 7% of the viewport height

      if (scrollY > threshold) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header className={` w-full z-[9999] fixed top-0 backdrop-blur-md`}>
        <div
          className={`  flex flex-col justify-between pt-4 w-full ${
            isSticky ? "" : "bg-[#C2C7C6] dark:bg-gray-900"
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
          <div
            className={`flex flex-col justify-center items-center ${
              isSticky ? "visible" : "hidden"
            }`}
          >
            <Search />
            <Tags />
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

      <div className="pt-16 flex flex-col justify-between items-center space-y-4 w-full">
        <h1
          className={`text-2xl font-semibold ${
            isSticky ? "invisible pb-20" : "visible"
          }`}
          id="iheader"
          ref={headerRef}
        >
          YashDex
        </h1>
        <div
          className={`flex flex-col space-y-4 justify-center w-full  ${
            isSticky ? "hidden" : "relative"
          }`}
          ref={searchRef}
        >
          <Search />
          <Tags />
        </div>
      </div>
    </>
  );
};

export default Header;
