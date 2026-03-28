import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className = "flex gap-5 ">
<button
      onClick={toggleTheme}
      className={`group relative flex h-12 w-24 items-center justify-center rounded-lg border border-sidebar-border bg-sidebar transition-all hover:bg-sidebar-hover gap-1 ${
        theme === 'light' ? 'bg-sidebar-hover' : ''
      }`}
    >
      <Sun />
      Claro

    
      
    </button>
    <button
      onClick={toggleTheme}
      className={`group relative flex h-12 w-24 items-center justify-center rounded-lg border border-sidebar-border bg-sidebar transition-all hover:bg-sidebar-hover gap-1 ${
        theme === 'dark' ? 'bg-sidebar-hover' : ''
      }`}
    >
      <Moon />
      Escuro  

    
      
    </button>
    </div>
    
  );
};

export default ThemeToggle;