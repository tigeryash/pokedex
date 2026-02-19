"use client";

import { useState } from "react";
import { PokemonMove } from "pokenode-ts";
import { motion } from "framer-motion";

type MovesListProps = {
  moves: PokemonMove[];
};

const MovesList = ({ moves }: MovesListProps) => {
  const [search, setSearch] = useState("");
  const [displayCount, setDisplayCount] = useState(20);

  if (!moves || moves.length === 0) {
    return null;
  }

  // Filter moves by search
  const filteredMoves = moves
    .filter(move => move.move.name.toLowerCase().includes(search.toLowerCase()))
    .slice(0, displayCount);

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 20);
  };

  return (
    <div className="w-full max-w-2xl">
      <h3 className="text-2xl font-bold text-center mb-4">Moves</h3>
      
      <input
        type="text"
        placeholder="Search moves..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setDisplayCount(20);
        }}
        className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
      />
      
      <div className="grid gap-2 max-h-96 overflow-y-auto">
        {filteredMoves.map((move, index) => (
          <motion.div
            key={`${move.move.name}-${index}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02 }}
            className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg flex justify-between items-center"
          >
            <span className="capitalize font-medium">
              {move.move.name.replace(/-/g, " ")}
            </span>
            <div className="flex gap-2">
              {move.version_group_details.some(v => v.move_learn_method.name === "level-up") && (
                <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded">
                  Lv.{move.version_group_details.find(v => v.move_learn_method.name === "level-up")?.level_learned_at || 1}
                </span>
              )}
              {move.version_group_details.some(v => v.move_learn_method.name === "machine") && (
                <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 rounded">
                  TM
                </span>
              )}
              {move.version_group_details.some(v => v.move_learn_method.name === "egg") && (
                <span className="text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-900 rounded">
                  Egg
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      {filteredMoves.length < moves.filter(m => m.move.name.toLowerCase().includes(search.toLowerCase())).length && (
        <button
          onClick={handleLoadMore}
          className="w-full mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Load More
        </button>
      )}
      
      <p className="text-sm text-gray-500 mt-2 text-center">
        Showing {filteredMoves.length} of {moves.filter(m => m.move.name.toLowerCase().includes(search.toLowerCase())).length} moves
      </p>
    </div>
  );
};

export default MovesList;
