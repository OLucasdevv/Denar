import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 left-0 right-0 z-[9999] bg-white h-16 justify-between flex items-center">

      {/* Logo */}
      <div>
        <Link to={"/"}>
          <button className="text-3xl ml-6 md:ml-16 lg:ml-52 tracking-wider font-medium cursor-pointer bg-gradient-to-r from-primary to-orange-700 bg-clip-text text-transparent">
            DENAR
          </button>
        </Link>
      </div>

      {/* Links — desktop */}
      <div className="hidden lg:block mr-52">
        <ul className="flex gap-7">
          <Link to={"/loginpage"}>
            <li className="hover:text-primary cursor-pointer transition-colors font-semibold">
              Login
            </li>
          </Link>
          <li className="hover:text-primary cursor-pointer transition-colors font-semibold">
            Criar conta
          </li>
          <li className="hover:text-primary cursor-pointer transition-colors text-gray-600 font-medium">
            <a href="#funcionalidades" className="cursor-pointer block">
              Funcionalidades
            </a>
          </li>
          <li className="hover:text-primary cursor-pointer transition-colors  text-gray-600 font-medium">
            <a href="#planos" onClick={() => setMenuOpen(false)} className="cursor-pointer block">
              Planos
            </a>
          </li>
        </ul>
      </div>

      {/* Hamburguer — mobile/tablet */}
      <button
        className="lg:hidden mr-6 md:mr-10 flex flex-col gap-[5px] group"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Abrir menu"
      >
        <span className={`block h-[2px] w-6 bg-gray-800 transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
        <span className={`block h-[2px] w-6 bg-gray-800 transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
        <span className={`block h-[2px] w-6 bg-gray-800 transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
      </button>

      {/* Menu dropdown — mobile/tablet */}
      <div
        className={`lg:hidden absolute top-16 left-0 right-0 bg-white shadow-md overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-4 gap-5">
          <Link to={"/loginpage"} onClick={() => setMenuOpen(false)}>
            <li className="hover:text-primary cursor-pointer transition-colors font-medium text-gray-800">
              Login
            </li>
          </Link>
          <li className="hover:text-primary cursor-pointer transition-colors font-medium text-gray-800">
            Criar conta
          </li>
          <li className="hover:text-primary cursor-pointer transition-colors text-gray-800">
            <a href="#funcionalidades" onClick={() => setMenuOpen(false)} className="cursor-pointer block">
              Funcionalidades
            </a>
          </li>
          <li className="hover:text-primary cursor-pointer transition-colors text-gray-800 ">
            <a href="#planos" onClick={() => setMenuOpen(false)} className="cursor-pointer block">
              Planos
            </a>
          </li>
        </ul>
      </div>

    </nav>
  );
};

export default Navbar;