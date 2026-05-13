import Sidebar from "@/components/navigationbars/Sidebar";
import Navbar from "@/components/navigationbars/Navbar";

export default function AuthLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <aside><Sidebar /></aside>

      <div className="flex-1 flex flex-col min-h-0">
        <Navbar />
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}