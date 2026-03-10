/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: "#f97316",
        secondary: "#64748b",
        danger: "#dc2626",
        success: "#16a34a"
      }
    },
  },
  plugins: [],
}