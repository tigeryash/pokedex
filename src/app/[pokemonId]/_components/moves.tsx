"use client";

import { useState } from "react";
import { PokemonMove } from "pokenode-ts";
import { SectionLabel } from "@/components/section-label";
import { Hexagon, Target } from "lucide-react";
import { PokemonTypesColors} from "@/lib/constants";

type PokemonMovesProps = {
  moves: PokemonMove[];
  color: string;
};

type MoveTab = "level-up" | "machine" | "egg" | "tutor";

const tabs: { id: MoveTab; label: string }[] = [
  { id: "level-up", label: "Level Up" },
  { id: "machine", label: "TM Moves" },
  { id: "egg", label: "Egg Moves" },
  { id: "tutor", label: "Tutor Moves" },
];

const CategoryIcon = ({ category }: { category: string }) => {
  if (category === "special") {
    return <Target className="w-3.5 h-3.5" />;
  }
  return <Hexagon className="w-3.5 h-3.5" />;
};

const formatName = (value: string) =>
  value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const PokemonMoves = ({ moves, color }: PokemonMovesProps) => {
  const [activeTab, setActiveTab] = useState<MoveTab>("level-up");

  if (!moves || moves.length === 0) {
    return null;
  }

  const filteredMoves = moves
    .filter((move) =>
      move.version_group_details.some(
        (detail) => detail.move_learn_method.name === activeTab,
      ),
    )
    .map((move) => {
      const currentMethod =
        move.version_group_details.find(
          (detail) => detail.move_learn_method.name === activeTab,
        ) ?? move.version_group_details[0];

      return {
        name: move.move.name,
        level: currentMethod?.level_learned_at ?? 0,
      };
    })
    .sort((left, right) => left.level - right.level || left.name.localeCompare(right.name))
    .slice(0, 40);

  return (
    <div id="moves">
      <SectionLabel>Moves</SectionLabel>
      <div className="flex gap-1 mb-5 border-b border-white/5 pb-0.5 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium bg-transparent border-none cursor-pointer relative whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? `border-b-2 border-[${PokemonTypesColors[color as keyof typeof PokemonTypesColors]}]`
                : "opacity-60 hover:opacity-100 border-b-2 border-transparent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left py-3 text-[0.7rem] uppercase text-(--text-tertiary) font-semibold border-b border-white/10">Level</th>
            <th className="text-left py-3 text-[0.7rem] uppercase text-(--text-tertiary) font-semibold border-b border-white/10">Move</th>
            <th className="text-left py-3 text-[0.7rem] uppercase text-(--text-tertiary) font-semibold border-b border-white/10">Type</th>
            <th className="text-left py-3 text-[0.7rem] uppercase text-(--text-tertiary) font-semibold border-b border-white/10">Category</th>
            <th className="text-left py-3 text-[0.7rem] uppercase text-(--text-tertiary) font-semibold border-b border-white/10">Pwr</th>
            <th className="text-left py-3 text-[0.7rem] uppercase text-(--text-tertiary) font-semibold border-b border-white/10">Acc</th>
          </tr>
        </thead>
        <tbody>
          {filteredMoves.map((move) => (
            <tr key={`${activeTab}-${move.name}`}>
              <td className="py-4 border-b border-white/3 text-sm text-(--text-secondary)">
                {activeTab === "level-up" ? (move.level || "—") : "—"}
              </td>
              <td className="py-4 border-b border-white/3 text-sm text-(--text-primary) font-medium">{formatName(move.name)}</td>
              <td className="py-4 border-b border-white/3 text-sm text-(--text-secondary)">
                <span className="inline-block px-2 py-0.5 rounded bg-white/10 text-[0.7rem]">—</span>
              </td>
              <td className="py-4 border-b border-white/3 text-sm text-(--text-secondary)">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[0.7rem] font-semibold uppercase tracking-wider bg-zinc-500/20 text-zinc-300 border border-zinc-500/30">
                  <CategoryIcon category="status" />
                  Unknown
                </span>
              </td>
              <td className="py-4 border-b border-white/3 text-sm text-(--text-secondary)">—</td>
              <td className="py-4 border-b border-white/3 text-sm text-(--text-secondary)">—</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredMoves.length === 0 && (
        <p className="mt-4 text-sm text-(--text-secondary)">No moves found for this category.</p>
      )}
    </div>
  );
};

export default PokemonMoves;
