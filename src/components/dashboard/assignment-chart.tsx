"use client"

import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartTooltipContent, ChartContainer } from "@/components/ui/chart";
import type { Assignment } from "@/types";

const chartConfig = {
  lots: {
    label: "Lots",
  },
  "chart-1": {
    color: "hsl(var(--chart-1))",
  },
  "chart-2": {
    color: "hsl(var(--chart-2))",
  }
};

type AssignmentChartProps = {
  assignments: Assignment[];
};

export function AssignmentChart({ assignments }: AssignmentChartProps) {
  const processChartData = (data: Assignment[]) => {
    const sectionCounts = data.reduce((acc, assignment) => {
      acc[assignment.section] = (acc[assignment.section] || 0) + 1;
      return acc;
    }, {} as Record<'A' | 'B' | 'C' | 'D', number>);

    return [
      { section: "A", lots: sectionCounts.A || 0, fill: "var(--color-chart-1)" },
      { section: "B", lots: sectionCounts.B || 0, fill: "var(--color-chart-2)" },
      { section: "C", lots: sectionCounts.C || 0, fill: "var(--color-chart-1)" },
      { section: "D", lots: sectionCounts.D || 0, fill: "var(--color-chart-2)" },
    ];
  };

  const chartData = processChartData(assignments);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assignment Distribution</CardTitle>
        <CardDescription>Number of lots per section</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <XAxis dataKey="section" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="lots" radius={[4, 4, 0, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
