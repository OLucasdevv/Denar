import LandingPage from "../pages/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Dashboard from "@/pages/Dashboard";
import RegisterPage from "../pages/RegisterPage";
import Transactions from "@/pages/Transactions";
import Appelant from "@/pages/Appelant";
import Onboarding from "@/pages/Onboarding";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useLocation } from 'react-router-dom';
import { useEffect } from "react";
import AuthLayout from "@/components/layouts/AuthLayout";
import Tendencies from "@/pages/Tendencies";

const ThemeWatcher = () => {
  const location = useLocation();

  useEffect(() => {
   
    const paginasSempreLight = ["/"];
    
    const savedTheme = localStorage.getItem("theme") || "dark";
    const isExceptionPage = paginasSempreLight.includes(location.pathname);

    if (!isExceptionPage && savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [location.pathname]);

  return null; 
};

const App = () => {
  return (
    <BrowserRouter>
      
      <ThemeWatcher /> 
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/registerpage" element={<RegisterPage />} />
        <Route path="/onboarding" element={<Onboarding />} />
        
        <Route path="/dashboard" element={
          <AuthLayout>
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          </AuthLayout>
        } />
        
        <Route path="/transacoes" element={
          <AuthLayout>
            <ProtectedRoute>
                <Transactions />
            </ProtectedRoute>
          </AuthLayout>
          } />
        
        <Route path="/recorrentes" element={
          <AuthLayout>
            <ProtectedRoute>
                <Appelant />
            </ProtectedRoute>
          </AuthLayout>
        } />
        <Route path="/tendencias" element={
          <AuthLayout>
            <ProtectedRoute>
                <Tendencies />
            </ProtectedRoute>
          </AuthLayout>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;