import homeIconData from '../assets/icons/Home-icon.json';
import AnimatedIcon from './AnimatedIcon';
import appellant from '../assets/icons/Rotate.json';
import TransactionIcon from '../assets/icons/Transaction.json';
import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Sidebar = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const { pathname } = useLocation();

  const menuItems = [
  { id: 1, label: 'Dashboard',   path: '/dashboard', icon: homeIconData },
  { id: 2, label: 'Transações',  path: '/transacoes',  icon: TransactionIcon },
  { id: 3, label: 'Recorrentes', path: '/recorrentes', icon: appellant },// A vibe que a gente falou!
];

  return (
    <nav className="flex flex-col h-screen bg-sidebar w-60 p-4 border-r-[0.2px] border-zinc-200/10 gap-10">
      
      <h1 className="text-foreground text-2xl tracking-wide self-start font-poppins">
        DENAR
      </h1>

      <div className="flex flex-col gap-4">
        <h1 className="text-foreground text-[10px] uppercase tracking-widest font-bold">
          Finanças
        </h1>
        {menuItems.map((item) => {
          const isSelected = location.pathname === item.path;
          return(
              <Link
              key={item.id}
              to={item.path}
              className = {`group items-center flex gap-2 text-sm rounded-md py-1 px-3 w-full text-sidebar-foreground hover:bg-sidebar-hover transition-all ${
                isSelected 
                ? 'bg-primary/0'
                : null
              }`}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              >
                <div className="icon-theme-filter">
            <AnimatedIcon animationData={item.icon} size={20} isHovered={hoveredId === item.id} />
              </div>

              <span className="">
            {item.label}
          </span>

              </Link>
          )
          
        })}
        
        

      </div>

    </nav>
  );
};

export default Sidebar;