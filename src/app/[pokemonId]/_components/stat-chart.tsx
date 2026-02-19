"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PokemonStat } from "pokenode-ts";

type StatChartProps = {
  stats: PokemonStat[];
};

const statShortName = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SP.ATK",
  "special-defense": "SP.DEF",
  speed: "SPD",
};

const statVariants = {
  initial: { opacity: 0, scaleX: 0, transformOrigin: "left" },
  whileInView: {
    opacity: 1,
    scaleX: 1,
    transition: {
      duration: 0.5,
      ease: [0.65, 0, 0.35, 1],
    },
  },
};

const StatChart = ({ stats }: StatChartProps) => {
  const ref = useRef<HTMLTableElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.5,
  });

  const colorForStat = (stat: number) => {
    if (stat < 50) return "bg-red-500";
    if (stat < 100) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <>
      <h3 className="text-2xl font-bold text-center">Base Stats</h3>

      <motion.table
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.2 }}
        whileInView="whileInView"
        className="w-full table-fixed"
      >
        <tbody>
          {stats.map((stat) => (
            <motion.tr key={stat.stat.name} className="flex items-center ">
              <td className="w-1/6 text-center">
                {statShortName[stat.stat.name as keyof typeof statShortName]}
              </td>

              <td className="w-1/6 text-center">{stat.base_stat}</td>

              <motion.td
                variants={statVariants}
                initial="initial"
                whileInView="whileInView"
                className={`h-2 rounded-full ${colorForStat(stat.base_stat)}`}
                style={{
                  width: `${(stat.base_stat / 255) * 100}%`,
                }}
              />
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </>
  );
};

export default StatChart;
