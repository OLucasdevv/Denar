import { useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import HealthMetrics from "@/components/layouts/HealthMetrics";
import SaudeBar from "@/components/layouts/SaudeBar";
import { useFinance } from "@/contexts/FinanceContext";
import Lottie from "lottie-react";
import SearchingGuy from "@/assets/icons/SearchingGuy.transparent.json";
import CsvUploadButton from "@/components/layouts/CsvUploadButton";
import Recorrentes from "@/components/layouts/Recorrentes";
import MoneyDestiny from "@/components/layouts/MoneyDestiny";
import TextType from "@/components/effects/TextType";

const Dashboard = () => {
  const {transacoes} = useFinance();
  const hasData = transacoes && transacoes.length > 0
  const { user } = useUser();

  const [mostrarAnimacao, setMostrarAnimacao] = useState(false);
  const [mostrarCursor, setMostrarCursor] = useState(true);

  const nome = user?.user_metadata?.full_name || "";
  const texto = `bem vindo de volta, ${nome}`;

  useEffect(() => {
    if (!user) return;

    const chave = `welcome-${user.id}`;
    const jaViu = sessionStorage.getItem(chave);

    if (!jaViu) {
      setMostrarAnimacao(true);
      sessionStorage.setItem(chave, "true");
    }
  }, [user]);

  useEffect(() => {
    if (!mostrarAnimacao) return;

    const tempoAnimacao = texto.length * 75 + 1500;

    const timer = setTimeout(() => {
      setMostrarCursor(false);
    }, tempoAnimacao);

    return () => clearTimeout(timer);
  }, [mostrarAnimacao, texto]);

  if (!user) return null;

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-background">

      {/* CONTAINER PRINCIPAL */}
      <div className="w-full h-full overflow-y-auto p-1">
        <div className="max-w-[1400px] mx-auto space-y-5">
          
          {/* HEADER */}
          
          {hasData ? (
            <>
            {mostrarAnimacao ? (
            <TextType
              text={[texto]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={mostrarCursor}
              cursorCharacter="_"
              deletingSpeed={50}
              loop={false}
            />
          ) : (
            <h1 className="text-lg">
              bem vindo de volta,{" "}
              <span className="text-primary/80">{nome}</span>
            </h1>
          )}
            {/* TOPO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <HealthMetrics />
  
          </div>

          {/* MEIO */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <SaudeBar />
            <MoneyDestiny />
          </div>

          {/* BAIXO */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
  <Recorrentes />
  <div className="bg-zinc-800 min-h-[220px] rounded-xl" />
  <div className="bg-zinc-800 min-h-[220px] rounded-xl" />
</div>
          </>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[60vh] ">
  <div style={{ width: 350, height: 350 }}>
     <Lottie animationData={SearchingGuy} loop={true} autoplay={true} />
  </div>
  <p className="text-zinc-400 text-center mt-[-80px] mb-10">
    Opa... Nenhuma Transação encontrada,<br/> 
    que tal importar um Extrato bancário?
  </p>
  <CsvUploadButton />
</div>
          )}
          

        </div>
      </div>
    </div>
  );
};

export default Dashboard;