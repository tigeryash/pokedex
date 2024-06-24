"use client";

import { useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { motion, useAnimation, inView, useInView } from "framer-motion";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Stat } from "@/types/pokemon-type";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type StatChartProps = {
  stats: Stat[];
};

const StatChart = ({ stats }: StatChartProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.5,
  });

  const data = {
    labels: Object.keys(stats),
    datasets: [
      {
        label: "Stats",
        data: Object.values(stats),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <Bar data={data} />
    </motion.div>
  );
};

export default StatChart;
