"use client";

import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Tags = () => {
  const [clicked, setClicked] = useState(false);

  const variants = {
    open: { opacity: 1, maxHeight: 500 }, // Adjust maxHeight to fit content
    collapsed: { opacity: 0, maxHeight: 0 },
  };

  return (
    <div>
      <AnimatePresence>
        {clicked && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={variants}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full flex flex-col space-y-2 items-center justify-center overflow-hidden"
          >
            <h3 className="text-2xl font-semibold">Tags</h3>
            <h4 className="text-sm font-medium">Types</h4>
            <h4>Abilities</h4>
            <h4>Generation</h4>
            <ChevronUpIcon
              onClick={() => setClicked(false)}
              className="w-4 h-4 cursor-pointer"
            />
          </motion.div>
        )}
      </AnimatePresence>
      {!clicked && (
        <div
          onClick={() => setClicked(true)}
          className="flex items-center justify-center cursor-pointer"
        >
          <ChevronDownIcon className="w-4 h-4 hover:animate-bounce" />
        </div>
      )}
    </div>
  );
};

export default Tags;
