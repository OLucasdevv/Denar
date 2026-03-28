import Sidebar from "@/components/navigationbars/Sidebar";
import Navbar from "@/components/navigationbars/Navbar";
import { parseCSV } from "@/lib/csvParser"
import { useState } from "react";

const handleUpload = async (e) => {
  
  const file = e.target.files[0]
  const transacoes = await parseCSV(file)
  console.log(transacoes)
}

const Transactions = () => {
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
export default Transactions;