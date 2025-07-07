"use client"

import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartTooltipContent, ChartContainer } from "@/components/ui/chart";

const chartData = [
  { section: "A", lots: 57, fill: "var(--color-chart-1)" },
  { section: "B", lots: 36, fill: "var(--color-chart-2)" },
  { section: "C", lots: 38, fill: "var(--color-chart-1)" },
  { section: "D", lots: 91, fill: "var(--color-chart-2)" },
]

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
}

export function AssignmentChart() {
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
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="lots" radius={[4, 4, 0, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
