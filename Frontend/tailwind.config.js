/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"], 
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        space: ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        "green": "#15803d",
        "red": "#dc2626",
        sidebar: {
          DEFAULT: "var(--sidebar)",
          foreground: "var(--sidebar-foreground)",
          border: "var(--sidebar-border)",
          hover: "var(--sidebar-hover)",
          accent: "var(--bg-accent)",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        primary: {
          DEFAULT: "#f97316",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#64748b",
          foreground: "#ffffff",
        },
        danger: "#dc2626",
        success: "#16a34a",
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
      boxShadow: {
        'neu-card': '0 5px 4px var(--shadow-dark), 0 -2px 3px var(--shadow-light), 2px 0 3px var(--shadow-dark), -4px 0 3px var(--shadow-light)',
        'neu-badge': '0 5px 4px var(--shadow-dark), 0 -1px 3px var(--shadow-light), 2px 0 3px var(--shadow-dark), -2px 0 3px var(--shadow-light)',
        'neu-btn': '4px 4px 8px var(--shadow-dark), -3px -3px 7px var(--shadow-light)',
        'neu-btn-pressed': 'inset 3px 3px 7px var(--shadow-dark), inset -2px -2px 5px var(--shadow-light)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}