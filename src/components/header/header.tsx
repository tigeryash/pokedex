"use client";

import React, { useEffect, useRef, useState } from "react";
import Search from "./search";
import Tags from "./tags";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import { useScroll, useTransform, motion } from "framer-motion";

const Header = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [isSticky, setIsSticky] = useState(false);

  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start 7%", "start 3%"],
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
    <header className="pt-16 ">
      <div
        className={`fixed top-0 flex flex-col justify-between pt-4 w-full ${
          isSticky ? "backdrop-blur-md" : "bg-white"
        } z-9999`}
        ref={triggerRef}
      >
        <div className="flex flex-row w-full justify-between items-center pb-2 px-4">
          <motion.h1
            className="text-2xl font-semibold"
            ref={targetRef}
            style={{ opacity }}
          >
            YashDex
          </motion.h1>

          <HamburgerMenuIcon className="w-8 h-8 ml-auto md:hidden" />
          <nav className="hidden md:flex ml-auto">
            <ul className="flex space-x-4">
              <li>Pokemon</li>
              <li>Items</li>
              <li>Moves</li>
            </ul>
          </nav>
        </div>
        <div
          className={`w-full flex flex-col items-center space-y-4 ${
            isSticky ? "visible" : "hidden"
          }`}
        >
          <Search />
          <Tags />
        </div>
      </div>

      <div className="flex flex-col justify-between items-center space-y-4 w-full">
        <h1
          className={`text-2xl font-semibold ${
            isSticky ? "invisible" : "visible"
          }`}
          ref={headerRef}
        >
          YashDex
        </h1>
        <div
          className={`flex flex-col space-y-4 justify-center items-center w-full  ${
            isSticky ? "invisible" : "visible"
          }`}
          ref={searchRef}
        >
          <Search />
          <Tags />
        </div>
      </div>
    </header>
  );
};

export default Header;
