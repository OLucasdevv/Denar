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







const Sidebar = () => {
  const { user } = useUser()
  const navigate = useNavigate()
const [Error, setError] = useState(false);
const [Loading, setLoading] = useState('');
const [isOpen, setIsOpen] = useState(false);


const getIniciais = (nome) => {
  if (!nome) return "?"
  return nome.split(" ").slice(0, 2).map(n => n[0].toUpperCase()).join("")
}

  const handleLogout = async (e) => {
      e.preventDefault();
      setError('');
      
      setLoading(true)
      const {data, error} = await supabase.auth.signOut()
      setLoading(false)

      if (error) {
        setError(error.message)
        return;
      }
      await fetch ('http://localhost:3333/auth/logout', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
      });
      navigate('/landingpage');
  };

  const [hoveredId, setHoveredId] = useState(null);
  const { pathname } = useLocation();

  const menuItems = [
  { id: 1, label: 'Visão Geral',   path: '/dashboard', icon: homeIconData },
  { id: 2, label: 'Transações',  path: '/transacoes',  icon: TransactionIcon },
  { id: 3, label: 'Recorrentes', path: '/recorrentes', icon: appellant },
];

  return (

    <nav className="flex flex-col h-screen bg-sidebar w-60 p-4 shadow-neu-card  gap-10">
      
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
              className = {`group items-center flex gap-2 text-sm rounded-md py-1 px-3 w-full text-sidebar-foreground  transition-all ${
                isSelected 
                ? 'bg-primary/35'
                : 'hover:bg-sidebar-hover'
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

      <div className="mt-auto w-full border-t border-zinc-700 h-12 -mx-4 px-28 flex justify-center items-end gap-3 cursor-pointer hover:bg-sidebar-hover" onClick={() => {setIsOpen(!isOpen)}}>
        {/* Avatar */}
        
  <div className="w-8 h-8 rounded-md bg-primary/20 flex items-center justify-center text-xs font-medium text-primary flex-shrink-0 ">
    {user?.user_metadata?.avatar_url 
      ? <img src={user.user_metadata.avatar_url} className="w-full h-full rounded-md object-cover" referrerPolicy="no-referrer"/>
      : getIniciais(user?.user_metadata?.full_name || user?.email)
    }
  </div>

  {/* Nome e email */}
  <div className="flex flex-col ">
    <p className="text-sm font-medium text-foreground truncate">
      {user?.user_metadata?.full_name || user?.email?.split("@")[0]}
    </p>
    <p className="text-xs text-zinc-500 truncate">
      {user?.email}
    </p>
  </div>
  
      </div>
      {isOpen && (
        
<ConfigModal isOpen={isOpen} setIsOpen={setIsOpen} />        
        
      )}
    </nav>
  );
};

export default Sidebar;