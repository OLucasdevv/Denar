

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
          <defs>
            <linearGradient id="grad-atual" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#dc2626" stopOpacity={0.85} />
              <stop offset="60%" stopColor="#dc2626" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#dc2626" stopOpacity={0} />
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
            fill="url(#grad-atual)"
            stroke="#dc2626"
            strokeWidth={2}
            activeDot={{ r: 6, fill: "#f97316", stroke: "#18181b", strokeWidth: 2 }}
            isAnimationActive={true}
            animationBegin={100}
            animationDuration={900}
            animationEasing="ease"
          />
          <Area
            dataKey="passado"
            type="monotone"
            fill="" 
            fillOpacity={0}
            strokeDasharray="5 5"
            stroke="#3c3c3c" // Cor da linha
            strokeWidth={2}
            activeDot={{ r: 6, fill: "#f97316", stroke: "#18181b", strokeWidth: 2 }}
            isAnimationActive={true}
            animationBegin={120}
            animationDuration={900}
            animationEasing="ease"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  )
};

export default SpendingPaceChart;