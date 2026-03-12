"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// 1. VOCÊ PRECISA DISSO AQUI EM CIMA:
// É esse objeto que faz o link entre o dado "valor" e a cor que você quer
const chartConfig = {
  valor: {
    label: "Saldo",
    color: "#f97316", // Seu laranja primário!
  },
}

const Chart = () => {
  const dadosFinanceiros = [
    { dia: "01/03", valor: 451.24 },
    { dia: "05/03", valor: 753.23 },
    { dia: "10/03", valor: 550.43 },
    { dia: "15/03", valor: 949.91 },
    { dia: "20/03", valor: 1000.12 },
  ];

  return (
    <div className="  p-6 rounded-2xl border border-zinc-300 w-full max-w-2xl shadow-2xl bg-gradient-to-r from-white/10 to-gray-200/90">
      <h2 className="text-black text-2xl font-semibold mb-4 ">Ritmo de Gastos</h2>
      
      
      <ChartContainer config={chartConfig} className="h-[250px] w-full">
        <AreaChart data={dadosFinanceiros}>
          <CartesianGrid vertical={false} stroke="#27272a" />
          
          <XAxis
            dataKey="dia"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tick={{ fill: '#71717a', fontSize: 12 }}
          />

          <YAxis domain={["dataMin", "dataMax"]}  />

          <ChartTooltip className = "bg-white border border-primary shadow-xl" content={<ChartTooltipContent 
    formatter={(value) => `R$ ${value}`} 
  />} />

          

          <Area
            dataKey="valor"
            type="monotone"
            fill="#f97316" 
            fillOpacity={0.1}
            stroke="#f97316" // Cor da linha
            strokeWidth={3}
            activeDot={{ r: 6, fill: "#f97316", stroke: "#18181b", strokeWidth: 2 }}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  )
};

export default Chart;