"use client";

import React, { useEffect, useRef, useState } from "react";
import Search from "./search";
import Tags from "./tags";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { motion, useScroll } from "framer-motion";

const Header = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const [isVisibleH, setIsVisibleH] = useState(false);
  const [isVisibleS, setIsVisibleS] = useState(false);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  useEffect(() => {
    const headerScroll = () => {
      const headerBottom = headerRef.current
        ?.getBoundingClientRect()
        .y.valueOf();
      const targetBottom = targetRef.current?.getBoundingClientRect().bottom;

      if (headerBottom && targetBottom && headerBottom <= targetBottom) {
        setIsVisibleH(true);
      } else {
        setIsVisibleH(false);
      }
    };

    // const searchScroll = () => {
    //   const headerBottom = headerRef.current?.getBoundingClientRect().bottom;
    //   const sTargetTop = searchRef.current?.getBoundingClientRect().top;

    //   if (headerBottom <= sTargetTop) {
    //     setIsVisibleS(false);
    //     console.log("visible");
    //   } else {
    //     setIsVisibleS(true);
    //     console.log("invisible");
    //   }
    // };

    if (headerRef.current) {
      window.addEventListener("scroll", headerScroll);
    }
    // if (searchRef.current) {
    //   window.addEventListener("scroll", searchScroll);
    // }

    return () => {
      window.removeEventListener("scroll", headerScroll);
      // window.removeEventListener("scroll", searchScroll);
    };
  }, []);

  return (
    <header className=" pt-16 ">
      <motion.div
        className="fixed top-0 flex flex-col justify-between items-center pt-4 w-full px-4 backdrop-blur-md z-9999"
        ref={targetRef}
      >
        <motion.div className="flex flex-row w-full justify-between items-center pb-4">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={isVisibleH ? { opacity: 1 } : { opacity: 0 }}
            exit={isVisibleH ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`text-2xl font-semibold `}
          >
            YashDex
          </motion.h1>

          <HamburgerMenuIcon className="w-8 h-8 ml-auto" />
        </motion.div>
        <motion.div className={`w-full ${isVisibleS ? "visible " : "hidden"}`}>
          <Search />
          <Tags />
        </motion.div>
      </motion.div>

      <div className="flex flex-col justify-between items-center space-y-4 w-full">
        <h1 className="text-2xl font-semibold " ref={headerRef}>
          YashDex
        </h1>
        <div
          className={`flex flex-col space-y-4justify-center items-center w-full ${
            isVisibleS ? "invisible" : "visible"
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
