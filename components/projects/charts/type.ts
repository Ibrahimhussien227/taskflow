export type ProjectsBarChartProps = {
  projects: { name: string; progress: number }[];
};
export type ProjectsPieChartProps = {
  chartData: { name: string; value: number }[];
};
