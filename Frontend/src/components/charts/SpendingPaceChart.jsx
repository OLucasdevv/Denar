

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart"
import usePace from "@/hooks/UsePace";
import { Variacao } from "../insights/Porcentage";

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
  
  const dadosGastos = usePace("gasto")  
  const ultimo = dadosGastos.at(-1) || { atual: 0, passado: 0 }

  return (
    <div className=" flex flex-col  p-5  shadow-neu-card rounded-lg w-full  bg-background  gap-3  ">

      
      <h2 className="text-foreground text-2xl font-poppins ">Ritmo de Gastos</h2>

      {/*
      div da previsão
      ex: (-26% em relação ao mês passado)

       */}

      <div className = "flex gap-4 items-center ">
          <p className = "font-space text-2xl text-red">
            R$ {ultimo.atual.toFixed(2).replace('.', ',')}
          </p>
          <p className = "will-change-contents shadow-neu-badge rounded-lg p-1 bg-background text-foreground text-xs inline-block whitespace-nowrap text-green">
<Variacao 
  atual={ultimo.atual} 
  passado={ultimo.passado} 
  tipo = "gasto"
/>
          </p>
      </div>

      <div className = "flex gap-2 ">
          <div className = "flex items-center gap-2">
            <div className = "bg-red h-2.5 w-2.5">

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
        <AreaChart data={dadosGastos}>
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