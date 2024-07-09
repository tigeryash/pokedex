"use client";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PokemonTypes, Regions } from "@/lib/constants";
import Image from "next/image";
import { usePokemonStore } from "@/stores/pokemonstore";

const Tags = () => {
  const { tagsClicked, setTagsClicked } = usePokemonStore();
  const variants = {
    open: { opacity: 1, maxHeight: 600 }, // Adjust maxHeight to fit content
    collapsed: { opacity: 0, maxHeight: 0 },
  };

  return (
    <div>
      <AnimatePresence>
        <motion.div
          initial="collapsed"
          animate={tagsClicked ? "open" : "collapsed"}
          exit="collapsed"
          variants={variants}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full flex flex-col space-y-4 items-center justify-center overflow-hidden"
        >
          <h3 className="text-2xl font-semibold">Tags</h3>
          <h4 className="text-sm font-medium">Types</h4>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {Object.keys(PokemonTypes).map((type) => (
              <Image
                key={type}
                src={PokemonTypes[type as keyof typeof PokemonTypes]}
                alt={type}
                width={32}
                height={32}
              />
            ))}
          </div>

          <h4>Region</h4>
          <div className="grid grid-cols-3 gap-2 w-full px-4">
            {Regions.map((region) => (
              <div className="form-control" key={region}>
                <label className="label cursor-pointer">
                  <input type="checkbox" defaultChecked className="checkbox" />
                  <span className="label-text">{region}</span>
                </label>
              </div>
            ))}
            <div className="form-control">
              <label className="label cursor-pointer">
                <input type="checkbox" defaultChecked className="checkbox" />
                <span className="label-text">All</span>
              </label>
            </div>
          </div>

          <h4>Options</h4>
          <div className="grid grid-cols-2 items-center justify-center gap-2">
            <div className="form-control">
              <label className="label cursor-pointer">
                <input type="checkbox" defaultChecked className="checkbox" />
                <span className="label-text">Numerical</span>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <input type="checkbox" defaultChecked className="checkbox" />
                <span className="label-text">Alphabetical</span>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <input type="checkbox" defaultChecked className="checkbox" />
                <span className="label-text">Legendary</span>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <input type="checkbox" defaultChecked className="checkbox" />
                <span className="label-text">Favorites</span>
              </label>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <ChevronDownIcon
        style={{
          transform: tagsClicked ? "rotate(180deg)" : "rotate(0deg)",
        }}
        onClick={() => {
          const temp = tagsClicked;
          setTagsClicked(!temp);
        }}
        className="w-6 h-6  cursor-pointer transition-transform duration-300 mx-auto"
      />
    </div>
  );
};

export default Tags;
