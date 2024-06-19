"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const mobileLinkVars = {
  initial: {
    y: "100%",
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  open: {
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      delay: 0.5,
      duration: 0.7,
    },
  },
};

export default function MenuLink({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  return (
    <motion.div
      variants={mobileLinkVars}
      initial="initial"
      animate="open"
      exit="initial"
      className="text-4xl text-black"
    >
      <Link href={href}>{label}</Link>
    </motion.div>
  );
}
