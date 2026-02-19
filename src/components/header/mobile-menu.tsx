"use client";

import { Cross1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import MenuLink from "./menu-link";
import { motion, cubicBezier, easeInOut } from "framer-motion";
import Image from "next/image";
import solgaleo from "../../../public/solgaleo.png";
import lunala from "../../../public/lunala.png";
import { useTheme } from "next-themes";

const MobileMenu = ({
  setIsMenuOpen,
  isMenuOpen,
  links,
}: {
  setIsMenuOpen: (isMenuOpen: boolean) => void;
  isMenuOpen: boolean;
  links: { label: string; href: string }[];
}) => {
  const { setTheme, theme } = useTheme();

  const menuVars = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: cubicBezier(0.65, 0, 0.35, 1),
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: cubicBezier(0.12, 0, 0.39, 1),
      },
    },
  };

 const containerVars = {
  initial: {},
  open: {
    transition: {
      delayChildren: 0.55,
      staggerChildren: 0.09,
      staggerDirection: 1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.09,
      staggerDirection: -1, // reverse order on close
    },
  },
};



const linkVars = {
  initial: { y: "120%", opacity: 0 },
  open: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.65, ease: cubicBezier(0.22, 1, 0.36, 1) },
  },
  exit: {
    y: "120%",
    opacity: 0,
    transition: { duration: .35, ease: cubicBezier(0.65, 0, 0.35, 1) },
  },
};



  const headerVars = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.2,
        delay: 0.4,
        ease: cubicBezier(0.12, 0, 0.39, 0),
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        delay: 0.4,
        ease: cubicBezier(0.12, 0, 0.39, 1),
      },
    },
  };

  return (
    <motion.div
      variants={menuVars}
      initial="initial"
      animate="animate"
      exit="exit"
      className="absolute top-0 left-0 w-full min-h-screen origin-top  flex flex-col justify-center items-center z-20
        bg-white dark:bg-[#240E62]
      "
    >
      <div className="flex justify-end items-center w-full p-4">
        <motion.h1
          initial={{
            opacity: 0,
            
          }}
          animate={{
            opacity: 1,
           
          }}
          exit={{
            opacity: 0,
          }}
          transition={{ duration: 0.2, delay: 0.4, ease: cubicBezier(0.12, 0, 0.39, 0) }}
          className="text-2xl "
        >
          YashDex
        </motion.h1>
        <motion.div
          variants={headerVars}
          initial="initial"
          animate="animate"
          exit="exit"
          className="ml-auto"
        >
          <Cross1Icon
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-8 h-8 lg:hidden"
          />
        </motion.div>
      </div>
      <motion.div
        variants={headerVars}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex justify-center items-center w-full gap-4 "
      >
        <motion.div
          style={{
            opacity: theme === "light" ? 1 : 0.6,
          }}
          onClick={() => setTheme("light")}
        >
          <Image src={solgaleo} alt="light mode" className="w-10 h-10" />
        </motion.div>
        <motion.div
          style={{
            opacity: theme === "dark" ? 1 : 0.6,
            transition: "opacity 0.2s",
          }}
          onClick={() => setTheme("dark")}
        >
          <Image src={lunala} alt="dark mode" className="w-10 h-10" />
        </motion.div>
      </motion.div>
      <motion.div
        variants={containerVars}
        initial="initial"
        animate="open"
        exit="exit"
        className="flex-1 flex flex-col justify-center items-center w-full space-y-4"
      >
        {links.map((link) => (
          <motion.li
            key={link.href} className="overflow-hidden "
          >
          <Link href={link.href} >  
            <motion.span  
              className="block text-4xl md:text-5xl font-medium no-underline transition-colors duration-200" 
              variants={linkVars}
            >
              {link.label}
            </motion.span>
          </Link>
        </motion.li>
        ))}
      </motion.div>
      <div className="flex justify-center items-center w-full p-4 pb-6">
        <motion.p
          initial={{ opacity: 0,  }}
          animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.5} }}
          exit={{ opacity: 0, transition: { duration: 0.2, delay: 0.2 } }}
        >
          Made by{" "}
          <Link href="https://github.com/tigeryash" target="_blank">
            Yash
          </Link>
        </motion.p>
      </div>
    </motion.div>
  );
};

export default MobileMenu;


