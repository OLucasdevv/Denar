

const Navbar = () => {
    return (
        <nav className = "w-full sticky top-0 z-50  bg-white h-16 justify-between flex items-center  ">
            <div>
                <h1 className = "text-3xl ml-52 tracking-wider font-medium cursor-pointer">
                    DENAR 
                </h1>
            </div>

            <div className = " mr-52">
                <ul className = "flex gap-7 ">
                    <li className = "hover:text-orange-500 cursor-pointer transition-colors font-medium">
                        Login
                    </li>
                    <li className = "hover:text-orange-500 cursor-pointer transition-colors font-medium ">
                        Criar conta
                    </li>
                    <li className = "hover:text-orange-500 cursor-pointer transition-colors">
                        Funcionalidades
                    </li>
                </ul>
            </div>

        </nav>
    )
};
export default Navbar;
