"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

import { ProjectsBarChartProps } from "./type";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function ProjectsBarChart({
  projects,
}: ProjectsBarChartProps) {
  const data = {
    labels: projects.map((p) => p.name),
    datasets: [
      {
        label: "Progress %",
        data: projects.map((p) => p.progress),
        backgroundColor: "#3B82F6",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { stepSize: 20 },
      },
    },
  };

  return (
    <div className="w-full h-72">
      <Bar data={data} options={options} />
    </div>
  );
}
