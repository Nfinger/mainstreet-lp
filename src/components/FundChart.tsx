"use client"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

function formatCurrencyK(value: number): string {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}k`;
  }
  return `$${value}`;
}

export type FundChartData = {
  date: string;
  value: number;
  cumulative_distribution: number;
}[];

interface FundChartProps {
  data: FundChartData;
}

const chartColors = {
  value: { line: "#e2b007", fill: "#f5d68a" },
  cumulative_distribution: { line: "#6b7280", fill: "#d1d5db" },
};

export function FundChart({ data }: FundChartProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-0 md:p-6">
      {/* Legend */}
      <div className="flex gap-8 items-center px-6 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full" style={{ background: chartColors.value.line }} />
          <span className="uppercase text-xs tracking-wide text-gray-500">Value</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full" style={{ background: chartColors.cumulative_distribution.line }} />
          <span className="uppercase text-xs tracking-wide text-gray-500">Cumulative Distribution</span>
        </div>
      </div>
      {/* Chart */}
      <CardContent className="pt-2 pb-0 px-2 md:px-6">
        <ChartContainer config={{}}>
          <AreaChart
            width={600}
            height={300}
            data={data}
            margin={{ left: 12, right: 12, top: 24, bottom: 0 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f3f3f3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => String(new Date(value).getFullYear())}
              style={{ fontSize: 14, fill: "#888" }}
            />
            <YAxis
              tickFormatter={(value: number) => formatCurrencyK(value)}
              tickLine={false}
              axisLine={false}
              width={60}
              style={{ fontSize: 14, fill: "#888" }}
            />
            <ChartTooltip
              cursor={false}
              content={({ active, payload }) => {
                if (!active || !payload || !payload.length) return null
                const d = payload[0].payload
                return (
                  <div className="rounded border bg-background p-2 shadow-sm text-[#23221e]">
                    <div className="font-semibold mb-1">{new Date(d.date).getFullYear()}</div>
                    <div>Value: <span className="font-medium">${d.value.toLocaleString()}</span></div>
                    <div>Cumulative Distribution: <span className="font-medium">${d.cumulative_distribution.toLocaleString()}</span></div>
                  </div>
                )
              }}
            />
            <Area
              dataKey="value"
              name="Value"
              type="monotone"
              fill={chartColors.value.fill}
              fillOpacity={0.4}
              stroke={chartColors.value.line}
              strokeWidth={2}
              dot={false}
            />
            <Area
              dataKey="cumulative_distribution"
              name="Cumulative Distribution"
              type="monotone"
              fill={chartColors.cumulative_distribution.fill}
              fillOpacity={0.2}
              stroke={chartColors.cumulative_distribution.line}
              strokeDasharray="4 2"
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="pt-0 pb-4 px-6">
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="font-semibold leading-none text-[#23221e]">
              Value, Cumulative Distribution, and Investment Growth from 2025 to 2030
            </div>
            <div className="leading-none text-gray-400 text-xs">
              Data is hypothetical and for illustrative purposes only.
            </div>
          </div>
        </div>
      </CardFooter>
    </div>
  )
}
