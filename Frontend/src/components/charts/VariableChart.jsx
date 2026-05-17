import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart"
import usePace from "@/hooks/UsePace";

const chartConfig = {
  atual: {
    label: "Este mês",
    color: "#ef4444",
  },
}

const VariableChart = () => {
  const dados = usePace("variavel")
  const ultimo = dados.at(-1) || { atual: 0 }

  return (
    <div className="flex flex-col p-5 shadow-neu-card rounded-lg w-full bg-background gap-3 h-full">

      <div>
        <h2 className="text-sm text-foreground font-medium">Ritmo de gastos variáveis</h2>
        <p className="text-xs text-zinc-600 mt-0.5">excluindo fixos e circulante</p>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-zinc-400 text-sm">Este mês</p>
        <p className="font-space text-2xl text-red-500">
          R$ {ultimo.atual.toFixed(2).replace('.', ',')}
        </p>
      </div>

      <ChartContainer config={chartConfig} className="h-[170px] w-full">
        <AreaChart data={dados}>
          <defs>
            <linearGradient id="grad-atual-red-var" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity={0.85} />
              <stop offset="60%" stopColor="#ef4444" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#27272a" />

          <XAxis
            dataKey="dia"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tick={{ fill: '#71717a', fontSize: 12 }}
          />

          <YAxis domain={[0, "dataMax"]} tickMargin={8} />

          <ChartTooltip
            className="shadow-neu-badge rounded-lg bg-background border-border text-foreground"
            content={<ChartTooltipContent
              separator=" "
              formatter={(value) => {
                const formatted = `R$ ${Number(value).toFixed(2).replace('.', ',')}`
                return [`Este mês: ${formatted}`]
              }}
            />}
          />

          <Area
            dataKey="atual"
            type="monotone"
            fill="url(#grad-atual-red-var)"
            stroke="#ef4444"
            strokeWidth={2}
            activeDot={{ r: 6, fill: "#ef4444", stroke: "#18181b", strokeWidth: 2 }}
            isAnimationActive={true}
            animationBegin={100}
            animationDuration={900}
            animationEasing="ease"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  )
};

export default VariableChart;