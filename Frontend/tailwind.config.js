/** @type {import('tailwindcss').Config} */
export default {
  // 1. Adicionado o darkMode para o gráfico ficar bonito no seu bg-zinc-900
  darkMode: ["class"], 
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        // --- SUAS CORES (Mantidas exatamente iguais) ---
        primary: {
          DEFAULT: "#f97316", // Seu laranja continua aqui!
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#64748b",
          foreground: "#ffffff",
        },
        danger: "#dc2626",
        success: "#16a34a",

        // --- CORES QUE O SHADCN PRECISA (Para os componentes e gráficos) ---
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        
        // Cores para os gráficos (chart-1 até chart-5)
        chart: {
          1: "var(--chart-1)",
          2: "var(--chart-2)",
          3: "var(--chart-3)",
          4: "var(--chart-4)",
          5: "var(--chart-5)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  // 2. Adicionado o plugin de animação que o shadcn usa
  plugins: [require("tailwindcss-animate")],
}