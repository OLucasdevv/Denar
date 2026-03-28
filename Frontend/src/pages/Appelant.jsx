import Sidebar from "@/components/navigationbars/Sidebar";
import Navbar from "@/components/navigationbars/Navbar";
const Appelant = () => {
    return (
<main>
            <main className = "flex bg-background">
            <div>
                <Sidebar />
                
            </div>

           


            <div className = "flex grid-cols-4 columns-auto  w-full">
                                    <div className = "w-full">
                                        <Navbar />
                                    </div>
                        
                                    </div>
            </main>
        </main>
    )
};
export default Appelant