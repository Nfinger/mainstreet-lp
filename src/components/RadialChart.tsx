"use client";

import {
  PolarGrid,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartConfig = {
  percentage: {
    label: "Percentage",
  },
} satisfies ChartConfig;

export function RadialChart({
    chartData,
}: {
    chartData: {
        percentage: number;
    }[];
}) {
  return (
    <ChartContainer config={chartConfig}>
      <RadialBarChart
        data={chartData}
        startAngle={0}
        endAngle={250}
        innerRadius={80}
        outerRadius={110}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-muted last:fill-background"
          polarRadius={[86, 74]}
        />
        <RadialBar dataKey="percentage" background cornerRadius={10} />
      </RadialBarChart>
    </ChartContainer>
  );
}
