import { PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartTooltip } from '../ui/chart'

const data = [
  { name: 'Alimentação', value: 400 },
  { name: 'Lazer', value: 300 },
  { name: 'Transporte', value: 300 },
  { name: 'Assinaturas', value: 200 },
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444']; // Cores pro seu tema

export default function CategoryChart() {
  return (
    <ChartContainer className="h-[200px] w-full">
      <PieChart>
        <Pie
          data={data}
          cx="50%" 
          cy="50%" // Centraliza no eixo Y
          innerRadius={60} // Faz um furo no meio (vira uma Donut!)
          outerRadius={80}
          paddingAngle={5} // Dá um espacinho entre as fatias (vibe clean)
          dataKey="value"
          isAnimationActive={true}
          animationBegin={120}
          animationDuration={900}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <ChartTooltip 
          contentStyle={{ backgroundColor: '#18181b', border: 'none', borderRadius: '8px', color: '#fff' }}
        />
      </PieChart>
    </ChartContainer>
  );
}