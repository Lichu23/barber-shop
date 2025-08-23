"use client";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface EarningsChartProps {
  data: { month: string; earnings: number }[];
}

const chartConfig = {
  earnings: {
    label: "Ganancias",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function EarningsChart({ data }: EarningsChartProps) {
  const currentMonth = data[data.length - 1];
  const prevMonth = data[data.length - 2];

  let trendText = "Sin datos suficientes";
  let trendIcon = null;

  if (currentMonth && prevMonth) {
    const diff = currentMonth.earnings - prevMonth.earnings;
    const percentChange = ((diff / prevMonth.earnings) * 100).toFixed(1);

    if (diff > 0) {
      trendText = `Ingresos subieron +${percentChange}% respecto al mes pasado`;
      trendIcon = <TrendingUp className="h-4 w-4 text-green-600" />;
    } else if (diff < 0) {
      trendText = `Ingresos bajaron ${percentChange}% respecto al mes pasado`;
      trendIcon = <TrendingDown className="h-4 w-4 text-red-600" />;
    } else {
      trendText = "Ingresos sin cambios respecto al mes pasado";
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Resumen de ingresos mensuales</CardTitle>
      </CardHeader>
      <Card>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)} // Ene, Feb, Mar...
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `€${value}`}
            />
            <ChartTooltip
              cursor={{ fill: "rgba(0,0,0,0.05)" }}
              content={<ChartTooltipContent />}
            />
            <Bar
              dataKey="earnings"
              fill="var(--color-earnings)"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </Card>
      <CardFooter className="flex items-center gap-2 text-sm">
        <div className="flex items-center  gap-2 leading-none font-medium mt-2">
          {trendIcon}
          <span className="text-muted-foreground  items-centerleading-none">
            {trendText}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
