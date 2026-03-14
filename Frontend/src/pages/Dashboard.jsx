import { ArrowLeftToLine, ArrowRightFromLine } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import Sidebar from '@/components/Sidebar';

const Dashboard = () => {
    return (
        <main>
            <main className = "flex bg-background">
            <div>
                <Sidebar />
            </div>

           


            <div>
                Dashboard
                <ThemeToggle />
            </div>
            </main>
        </main>
    )
};
export default Dashboard;