import homeIconData from '../../assets/icons/Home-icon.json';
import AnimatedIcon from '../effects/AnimatedIcon';
import appellant from '../../assets/icons/Rotate.json';
import TransactionIcon from '../../assets/icons/Transaction.json';
import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ThemeToggle from '../layouts/ThemeToggle';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/supabaseClient';
import { useUser } from "@/contexts/UserContext"
import ConfigModal from '../layouts/ConfigModal';
import TendenciesIcon from '../../assets/icons/Tendencies.json';

const Sidebar = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const location = useLocation();
  const [Error, setError] = useState(false);
  const [Loading, setLoading] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [animating, setAnimating] = useState(false);

  const getIniciais = (nome) => {
    if (!nome) return "?"
    return nome.split(" ").slice(0, 2).map(n => n[0].toUpperCase()).join("")
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true)
    const { data, error } = await supabase.auth.signOut()
    setLoading(false)
    if (error) { setError(error.message); return; }
    await fetch('http://localhost:3333/auth/logout', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
    });
    navigate('/landingpage');
  };

  const handleToggle = () => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setCollapsed(prev => !prev)
      setAnimating(false)
    }, 200)
  }

  const [hoveredId, setHoveredId] = useState(null);

  const menuItems = [
    { id: 1, label: 'Visão Geral',  path: '/dashboard',   icon: homeIconData },
    { id: 2, label: 'Transações',   path: '/transacoes',  icon: TransactionIcon },
    { id: 3, label: 'Recorrentes',  path: '/recorrentes', icon: appellant },
    { id: 4, label: 'Tendências',   path: '/tendencias',  icon: TendenciesIcon },
  ];

  return (
    <nav className={`flex flex-col h-screen bg-sidebar shadow-neu-card transition-all duration-300 ease-in-out ${collapsed ? 'w-16' : 'w-60'}`}>

      {/* CONTEÚDO COM PADDING */}
      <div className="flex flex-col gap-10 p-4 flex-1 min-h-0">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h1 className={`text-foreground text-2xl font-medium tracking-wide font-poppins bg-gradient-to-r from-primary to-orange-700 bg-clip-text text-transparent overflow-hidden transition-all duration-300 ${collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
            DENAR
          </h1>

          <button
            onClick={handleToggle}
            aria-label="Toggle sidebar"
            className="relative overflow-hidden p-1.5 rounded-lg hover:bg-background active:scale-95 transition-colors flex-shrink-0"
          >
            <div
              style={{
                transition: animating
                  ? 'transform 0.2s ease, opacity 0.2s ease'
                  : 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease',
                transform: animating ? 'translateX(24px)' : 'translateX(0)',
                opacity: animating ? 0 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {collapsed ? (
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <rect x="2" y="3" width="16" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.3"/>
                  <line x1="7" y1="3.5" x2="7" y2="16.5" stroke="currentColor" strokeWidth="1.3"/>
                  <polyline points="10,7.5 13,10 10,12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <rect x="2" y="3" width="16" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.3"/>
                  <line x1="7" y1="3.5" x2="7" y2="16.5" stroke="currentColor" strokeWidth="1.3"/>
                </svg>
              )}
            </div>
          </button>
        </div>

        {/* MENU */}
        <div className="flex flex-col gap-4">
          {!collapsed && (
            <h1 className="text-foreground text-[10px] uppercase tracking-widest font-medium transition-opacity duration-200">
              Finanças
            </h1>
          )}
          {menuItems.map((item) => {
            const isSelected = location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`group items-center flex gap-2 text-sm rounded-md py-1 px-3 w-full text-sidebar-foreground transition-all ${
                  isSelected ? 'bg-primary/35' : 'hover:bg-sidebar-hover'
                } ${collapsed ? 'justify-center px-2' : ''}`}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="icon-theme-filter flex-shrink-0">
                  <AnimatedIcon animationData={item.icon} size={20} isHovered={hoveredId === item.id} />
                </div>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </div>

      </div>

      {/* FOOTER — fora do padding, cola nas bordas */}
      <div
        className="border-t border-zinc-700 px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-sidebar-hover transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-8 h-8 rounded-md bg-primary/20 flex items-center justify-center text-xs font-medium text-primary flex-shrink-0">
          {user?.user_metadata?.avatar_url
            ? <img src={user.user_metadata.avatar_url} className="w-full h-full rounded-md object-cover" referrerPolicy="no-referrer"/>
            : getIniciais(user?.user_metadata?.full_name || user?.email)
          }
        </div>
        {!collapsed && (
          <div className="flex flex-col min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {user?.user_metadata?.full_name || user?.email?.split("@")[0]}
            </p>
            <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
          </div>
        )}
      </div>

      {isOpen && <ConfigModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </nav>
  );
};

export default Sidebar;