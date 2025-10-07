"use client";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { ProjectsPieChartProps } from "./type";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProjectsPieChart({
  chartData,
}: ProjectsPieChartProps) {
  const data = {
    labels: chartData.map((d) => d.name),
    datasets: [
      {
        label: "Projects",
        data: chartData.map((d) => d.value),
        backgroundColor: ["#10B981", "#3B82F6", "#F59E0B"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full h-72">
      <Pie
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,

          plugins: { legend: { position: "bottom" } },
        }}
      />
    </div>
  );
}
