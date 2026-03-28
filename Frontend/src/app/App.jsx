import LandingPage from "../pages/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Dashboard from "@/pages/Dashboard";
import RegisterPage from "../pages/RegisterPage";
import Transactions from "@/pages/Transactions";
import Appelant from "@/pages/Appelant";
import Onboarding from "@/pages/Onboarding";
import ProtectedRoute from "@/components/ProtectedRoute";



const App = () => (

  

<BrowserRouter>
  
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/registerpage" element={<RegisterPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
          <Dashboard />
          </ProtectedRoute>
          } />
        <Route path="/transacoes" element={
          <Transactions />} />
        <Route path="/recorrentes" element={
          <ProtectedRoute>
          <Appelant />
          </ProtectedRoute>
      } />
        <Route path= "/onboarding" element = {<Onboarding />} />
      </Routes>
    </BrowserRouter>
);

export default App;
