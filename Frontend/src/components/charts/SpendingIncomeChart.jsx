

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart"

// 1. VOCÊ PRECISA DISSO AQUI EM CIMA:
// É esse objeto que faz o link entre o dado "valor" e a cor que você quer
const chartConfig = {
  
  atual: {
    label: "Este mês",
    color: "#f97316",
  },
  passado: {
    label: "Mês passado",
    color: "#52525b",
  },

}

const SpendingIncomeChart = () => {
  const dadosFinanceiros = [
  { dia: "01", atual: 190.50, passado: 210.30 },
  { dia: "02", atual: 380.20, passado: 390.80 },
  { dia: "03", atual: 380.20, passado: 390.80 },
  { dia: "04", atual: 570.80, passado: 610.20 },
  { dia: "05", atual: 570.80, passado: 610.20 },
  { dia: "06", atual: 760.40, passado: 820.50 },
  { dia: "07", atual: 950.10, passado: 1020.30 },
  { dia: "08", atual: 1140.60, passado: 1240.70 },
  { dia: "09", atual: 1140.60, passado: 1240.70 },
  { dia: "10", atual: 1520.30, passado: 1650.40 },
  { dia: "11", atual: 1710.90, passado: 1840.20 },
  { dia: "12", atual: 1900.50, passado: 2050.80 },
  { dia: "13", atual: 2090.20, passado: 2260.40 },
  { dia: "14", atual: 2280.70, passado: 2480.90 },
  { dia: "15", atual: 2660.40, passado: 2750.60 },
  { dia: "16", atual: 2950.30, passado: 3010.80 },
  { dia: "17", atual: 3240.20, passado: 3580.50 },
];

  return (
    <div className=" flex flex-col  p-5  shadow-neu-card rounded-lg w-full  bg-background  gap-3  ">

      
      <h2 className="text-foreground text-2xl font-poppins ">Ritmo de Ganhos</h2>

      {/*
      div da previsão
      ex: (-26% em relação ao mês passado)

       */}

      <div className = "flex gap-4 items-center ">
          <p className = "font-space text-2xl ">
            R$ 3.240,20
          </p>
          <p className = "will-change-contents shadow-neu-badge rounded-lg p-1 bg-background text-foreground text-xs inline-block whitespace-nowrap text-red-600 ">
-10% vs mês passado 
          </p>
      </div>

      <div className = "flex gap-2 ">
          <div className = "flex items-center gap-2">
            <div className = "bg-green-700 h-2.5 w-2.5">

            </div>
            <p className = "text-sm">
              Este Mês
            </p>
          </div>
          <div className = "flex items-center gap-2">
            <div className = "bg-zinc-600 h-2.5 w-2.5">

            </div>
            <p className = "text-sm">
              Mês passado
            </p>
          </div>
      </div>
              
      
     
     
      
      
      
      <ChartContainer config={chartConfig} className="h-[170px] w-full">
        <AreaChart data={dadosFinanceiros}>
          <CartesianGrid vertical={false} stroke="#27272a" />
          
          <XAxis
            dataKey="dia"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tick={{ fill: '#71717a', fontSize: 12 }}
          />

          <YAxis domain={["dataMin", "dataMax"]} tickMargin={8}  />

          <ChartTooltip 
          
  className="shadow-neu-badge rounded-lg bg-background border-border text-foreground " 
  content={<ChartTooltipContent 
    separator=" "
   
    formatter={(value, name) => {
  const label = name === "atual" ? "Este mês" : "Mês passado"
  const formatted = `R$ ${Number(value).toFixed(2).replace('.', ',')}`
  return [`${label}: ${formatted}`]
}}
  />} 
/>

          

          <Area
            dataKey="atual"
            type="monotone"
            fill="#15803d" 
            fillOpacity={0.3}
            stroke="#15803d" // Cor da linha
            strokeWidth={2}
            activeDot={{ r: 6, fill: "#16a34a", stroke: "#18181b", strokeWidth: 2 }}
          />
          <Area
            dataKey="passado"
            type="monotone"
            fill="" 
            fillOpacity={0}
            strokeDasharray="5 5"
            stroke="#52525b" // Cor da linha
            strokeWidth={3}
            activeDot={{ r: 6, fill: "#16a34a", stroke: "#18181b", strokeWidth: 2 }}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  )
};

export default SpendingIncomeChart;