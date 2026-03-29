import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="w-full fixed top-0 left-0 right-0 z-[9999] bg-white h-16 justify-between flex items-center ">
            <div>

                    <Link
                to={"/"}
                >
                <button 
                className = "text-3xl ml-52 tracking-wider font-medium cursor-pointer"
                
                >
                    DENAR
                </button>
                </Link>
                
            </div>

            <div className=" mr-52">
                <ul className="flex gap-7 ">
                    <Link
                    to={"/loginpage"}
                    >
                        <li className="hover:text-primary cursor-pointer transition-colors font-medium">
                        Login
                    </li>
                    </Link>
                    
                    <li className="hover:text-primary cursor-pointer transition-colors font-medium ">
                        Criar conta
                    </li>
                    <li className="hover:text-primary cursor-pointer transition-colors">
                        <a href="#funcionalidades" className="cursor-pointer block">
    Funcionalidades
  </a>
                    </li>
                </ul>
            </div>

        </nav>
    )
};
export default Navbar;
