
import { useLocation } from "react-router-dom";

const menuItems = [
  { id: 1, label: 'Visão Geral',  path: '/dashboard'   },
  { id: 2, label: 'Transações',   path: '/transacoes'  },
  { id: 3, label: 'Recorrentes',  path: '/recorrentes' },
];

export default function Navbar() {
  const { pathname } = useLocation();

  const currentTitle =
    menuItems.find((item) => pathname.startsWith(item.path))?.label ?? "Visão Geral";

  return (
    <nav className="flex items-center justify-between bg-sidebar shadow-neu-card  px-6 h-[52px] w-full  top-0  z-[9999] ">

      {/* Esquerda — título dinâmico */}
      <div className="flex items-center gap-2.5">
        <div className="grid grid-cols-3 gap-[3px] opacity-60">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className="w-[5px] h-[5px] bg-[#a0a0b8] rounded-[1px]" />
          ))}
        </div>
        <span className="text-[15px] text-foreground   font-semibold text-[#e8e8f0] tracking-wide">
          {currentTitle}
        </span>
      </div>

      {/* Direita */}
      <div className="flex items-center gap-1.5">
        <button className="relative w-[34px] h-[34px] flex items-center justify-center rounded-lg text-[#9090a8] hover:bg-sidebar-hover hover:text-[#e0e0ef] transition-colors">
          <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute top-[7px] right-[7px] w-[6px] h-[6px] bg-primary rounded-full border-[1.5px] border-[#1c1c2e]" />
        </button>

        
      </div>
    </nav>
  );
}