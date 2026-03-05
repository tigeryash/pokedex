"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { PokemonMove } from "pokenode-ts";
import { SectionLabel } from "@/components/section-label";
import { PokemonTypes, PokemonTypesColors } from "@/lib/constants";

type PokemonMovesProps = {
  moves: PokemonMove[];
};

type MoveTab = "level-up" | "machine" | "egg" | "tutor";

type MoveMeta = {
  type: string;
  power: number | null;
  accuracy: number | null;
  damageClass: "physical" | "special" | "status" | null;
};

const tabs: { id: MoveTab; label: string }[] = [
  { id: "level-up", label: "Level Up" },
  { id: "machine", label: "TM Moves" },
  { id: "egg", label: "Egg Moves" },
  { id: "tutor", label: "Tutor Moves" },
];

const categoryImageMap: Record<"physical" | "special" | "status", string> = {
  physical: "/physical.png",
  special: "/special.png",
  status: "/status.png",
};

const formatName = (value: string) =>
  value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const PokemonMoves = ({ moves }: PokemonMovesProps) => {
  const [activeTab, setActiveTab] = useState<MoveTab>("level-up");
  const [moveMetaByName, setMoveMetaByName] = useState<Record<string, MoveMeta>>({});

  if (!moves || moves.length === 0) {
    return null;
  }

  const filteredMoves = useMemo(
    () =>
      moves
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
        .sort(
          (left, right) =>
            left.level - right.level || left.name.localeCompare(right.name),
        )
        .slice(0, 40),
    [activeTab, moves],
  );

  useEffect(() => {
    const namesToFetch = filteredMoves
      .map((move) => move.name)
      .filter((name) => !moveMetaByName[name]);

    if (namesToFetch.length === 0) {
      return;
    }

    let cancelled = false;

    const fetchMoveMeta = async () => {
      const results = await Promise.allSettled(
        namesToFetch.map(async (name) => {
          const response = await fetch(`https://pokeapi.co/api/v2/move/${name}`, {
            cache: "force-cache",
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch move data for ${name}`);
          }

          const data = (await response.json()) as {
            type?: { name?: string };
            power?: number | null;
            accuracy?: number | null;
            damage_class?: { name?: "physical" | "special" | "status" };
          };

          return {
            name,
            meta: {
              type: data.type?.name ?? "unknown",
              power: data.power ?? null,
              accuracy: data.accuracy ?? null,
              damageClass: data.damage_class?.name ?? null,
            } satisfies MoveMeta,
          };
        }),
      );

      if (cancelled) {
        return;
      }

      setMoveMetaByName((previous) => {
        const next = { ...previous };

        results.forEach((result) => {
          if (result.status === "fulfilled") {
            next[result.value.name] = result.value.meta;
          }
        });

        return next;
      });
    };

    void fetchMoveMeta();

    return () => {
      cancelled = true;
    };
  }, [filteredMoves, moveMetaByName]);

  return (
    <div id="moves" className="min-h-130 relative">
      <SectionLabel>Moves</SectionLabel>
      <div className="flex gap-1 mb-5 border-b border-zinc-300/80 dark:border-white/10  overflow-x-auto [scrollbar-gutter:stable]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 z-2 py-2 text-sm font-medium bg-transparent cursor-pointer relative whitespace-nowrap transition-colors border-b-4 ${
              activeTab === tab.id
                ? "opacity-100 border-[#ee741a] dark:border-[#240e62]"
                : "opacity-50 hover:opacity-100 border-transparent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse min-h-115 table-fixed">
          <thead>
            <tr>
              <th className="w-[10%] text-left py-3 text-[0.7rem] uppercase text-(--text-tertiary) font-semibold border-b border-zinc-300/80 dark:border-white/10">Level</th>
              <th className="w-[30%] text-left py-3 text-[0.7rem] uppercase text-(--text-tertiary) font-semibold border-b border-zinc-300/80 dark:border-white/10">Move</th>
              <th className="w-[16%] text-left py-3 text-[0.7rem] uppercase text-(--text-tertiary) font-semibold border-b border-zinc-300/80 dark:border-white/10">Type</th>
              <th className="w-[20%] text-left py-3 text-[0.7rem] uppercase text-(--text-tertiary) font-semibold border-b border-zinc-300/80 dark:border-white/10">Category</th>
              <th className="w-[12%] text-left py-3 text-[0.7rem] uppercase text-(--text-tertiary) font-semibold border-b border-zinc-300/80 dark:border-white/10">Pwr</th>
              <th className="w-[12%] text-left py-3 text-[0.7rem] uppercase text-(--text-tertiary) font-semibold border-b border-zinc-300/80 dark:border-white/10">Acc</th>
            </tr>
          </thead>
          <tbody>
            {filteredMoves.map((move) => {
              const moveMeta = moveMetaByName[move.name];
              const moveType = moveMeta?.type;
              const typeColor = moveType
                ? PokemonTypesColors[moveType as keyof typeof PokemonTypesColors]
                : undefined;
              const damageClass = moveMeta?.damageClass;

              return (
                <tr key={`${activeTab}-${move.name}`} className="hover:bg-zinc-300/20 dark:hover:bg-white/10 rounded-lg ">
                  <td className="py-4 border-b border-zinc-300/60 dark:border-white/5 text-sm text-(--text-secondary) pl-2">
                    {activeTab === "level-up" ? move.level || "—" : "—"}
                  </td>
                  <td className="py-4 border-b border-zinc-300/60 dark:border-white/5 text-sm text-(--text-primary) font-medium">
                    {formatName(move.name)}
                  </td>
                  <td className="py-4 border-b border-zinc-300/60 dark:border-white/5 text-sm text-(--text-secondary)">
                    {moveType && typeColor ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[0.7rem] font-semibold text-white opacity-85" style={{ backgroundColor: typeColor }}>
                        <Image
                          src={PokemonTypes[moveType as keyof typeof PokemonTypes]}
                          alt={moveType}
                          width={14}
                          height={14}
                          className="w-3.5 h-3.5"
                        />
                        {formatName(moveType)}
                      </span>
                    ) : (
                      <span className="inline-block px-2 py-0.5 rounded bg-zinc-200 dark:bg-white/10 text-[0.7rem]">—</span>
                    )}
                  </td>
                  <td className="py-4 border-b border-zinc-300/60 dark:border-white/5 text-sm text-(--text-secondary)">
                    {damageClass ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[0.7rem] font-semibold uppercase tracking-wider bg-zinc-800/10 text-white border border-zinc-500/30">
                        <Image
                          src={categoryImageMap[damageClass]}
                          alt={damageClass}
                          width={14}
                          height={14}
                          className="w-3.5 h-3.5"
                        />
                        {damageClass}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="py-4 border-b border-zinc-300/60 dark:border-white/5 text-sm text-(--text-secondary)">
                    {moveMeta?.power ?? "—"}
                  </td>
                  <td className="py-4 border-b border-zinc-300/60 dark:border-white/5 text-sm text-(--text-secondary)">
                    {moveMeta?.accuracy ?? "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredMoves.length === 0 && (
        <p className="mt-4 text-sm text-(--text-secondary) absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">No moves found for this category.</p>
      )}
    </div>
  );
};

export default PokemonMoves;
