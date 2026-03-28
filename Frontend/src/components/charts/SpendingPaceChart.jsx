

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

const SpendingPaceChart = () => {
  const dadosFinanceiros = [
  { dia: "01", atual: 45.90, passado: 32.50 },
  { dia: "02", atual: 98.40, passado: 89.20 },
  { dia: "03", atual: 98.40, passado: 145.80 },
  { dia: "04", atual: 210.30, passado: 198.40 },
  { dia: "05", atual: 314.12, passado: 310.20 },
  { dia: "06", atual: 340.80, passado: 420.90 },
  { dia: "07", atual: 520.50, passado: 580.30 },
  { dia: "08", atual: 620.90, passado: 690.10 },
  { dia: "09", atual: 620.90, passado: 780.50 },
  { dia: "10", atual: 750.20, passado: 920.40 },
  { dia: "11", atual: 840.60, passado: 1050.80 },
  { dia: "12", atual: 940.30, passado: 1180.20 },
  { dia: "13", atual: 940.30, passado: 1290.60 },
  { dia: "14", atual: 1000.70, passado: 1420.30 },
  { dia: "15", atual: 1280.40, passado: 1580.90 },
  { dia: "16", atual: 1450.20, passado: 1720.40 },
  { dia: "17", atual: 1870.00, passado: 2540.80 },
];

  return (
    <div className=" flex flex-col  p-5  shadow-neu-card rounded-lg w-full  bg-background  gap-3  ">

      
      <h2 className="text-foreground text-2xl font-poppins ">Ritmo de Gastos</h2>

      {/*
      div da previsão
      ex: (-26% em relação ao mês passado)

       */}

      <div className = "flex gap-4 items-center ">
          <p className = "font-space text-2xl">
            R$ 2.540,80
          </p>
          <p className = "will-change-contents shadow-neu-badge rounded-lg p-1 bg-background text-foreground text-xs inline-block whitespace-nowrap text-green-700 ">
+26% vs mês passado 
          </p>
      </div>

      <div className = "flex gap-2 ">
          <div className = "flex items-center gap-2">
            <div className = "bg-red-600 h-2.5 w-2.5">

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
          
  className="shadow-neu-badge rounded-lg bg-background border-border text-foreground" 
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
            fill="#dc2626" 
            fillOpacity={0.3}
            stroke="#dc2626" // Cor da linha
            strokeWidth={2}
            activeDot={{ r: 6, fill: "#f97316", stroke: "#18181b", strokeWidth: 2 }}
          />
          <Area
            dataKey="passado"
            type="monotone"
            fill="" 
            fillOpacity={0}
            strokeDasharray="5 5"
            stroke="#52525b" // Cor da linha
            strokeWidth={3}
            activeDot={{ r: 6, fill: "#f97316", stroke: "#18181b", strokeWidth: 2 }}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  )
};

export default SpendingPaceChart;