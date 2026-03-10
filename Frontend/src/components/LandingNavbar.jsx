const Navbar = () => {
    return (
        <nav className="w-full fixed top-0 left-0 right-0 z-[9999] bg-white h-16 justify-between flex items-center ">
            <div>
                <h1 className="text-3xl ml-52 tracking-wider font-medium cursor-pointer">
                    DENAR 
                </h1>
            </div>

            <div className=" mr-52">
                <ul className="flex gap-7 ">
                    <li className="hover:text-primary cursor-pointer transition-colors font-medium">
                        Login
                    </li>
                    <li className="hover:text-primary cursor-pointer transition-colors font-medium ">
                        Criar conta
                    </li>
                    <li className="hover:text-primary cursor-pointer transition-colors">
                        Funcionalidades
                    </li>
                </ul>
            </div>

        </nav>
    )
};
export default Navbar;
