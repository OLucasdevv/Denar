import { useState } from "react";
import Stepper, { Step } from "../components/layouts/Stepper";
import { parseCSV } from "@/lib/csvParser";
import { Upload } from 'lucide-react';
import CsvUploadButton from "@/components/layouts/CsvUploadButton";



const Onboarding = () => {
  const [error, setError] = useState();
  const [userName, setuserName] = useState();
  const [userIncome, setuserIncome] = useState();

  



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    

    const response = await fetch ('')

  }





  const [OnboardingData, setOnboardingData] = useState({
    name: "",
    income: "",
  });
  const [isOpen, setIsOpen] = useState(false)

  const [currentStep, setCurrentStep] = useState(1);

  const name = OnboardingData.name.trim();


  
  const invalidName =
    name.length < 3 ||
    !/[a-zA-ZÀ-ÿ]/.test(name) ||
    !/[aeiouáéíóú]/i.test(name);

  const isDisabled =
    (currentStep === 2 && invalidName) ||
    (currentStep === 3 && OnboardingData.income.trim() === "");

  return (
    <section className="h-screen bg-background">
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col h-[600px] w-[450px] bg-sidebar p-6 rounded-md shadow-2xl shadow-black">
          <Stepper
            className="h-full text-white"
            initialStep={1}
            onStepChange={(step) => setCurrentStep(step)}
            onFinalStepCompleted={() => console.log("All steps completed!")}
            backButtonText="Voltar"
            nextButtonText= "Próximo"
            nextButtonProps={{
              disabled: isDisabled,
              className: `flex items-center justify-center rounded-full py-1.5 px-3.5 font-medium tracking-tight text-black ${
                isDisabled
                  ? "bg-zinc-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-primary to-orange-700 hover:from-orange-700 hover:to-primary transition-all duration-900"

              }`,
            }}
          >
            <Step>
              <div className="h-full flex flex-col items-center gap-5 text-center">
                <h2 className="text-3xl tracking-wider font-medium text-white">
                  DENAR
                </h2>

                <p className="text-zinc-300 text-lg">
                  Você está a alguns passos de tornar sua vida financeira mais simples.
                </p>

                <img
                  src="/FinancePana.svg"
                  className="max-h-full w-auto object-contain"
                />
              </div>
            </Step>

            <Step>
              <div className="flex flex-col gap-10 mt-20">
                <h2 className="text-zinc-300">
                  Para começarmos, nos diga como gostaria de ser chamado(a)
                </h2>

                <input
                  type="text"
                  placeholder="digite seu nome"
                  className="w-full px-4 py-2 bg-transparent border border-zinc-500 rounded-lg placeholder-zinc-400 text-white focus:border-primary focus:outline-none"
                  value={OnboardingData.name}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");

                    setOnboardingData((prev) => ({
                      ...prev,
                      name: value,
                    }));
                  }}
                />
              </div>
            </Step>
            

            <Step>
              <div className="flex flex-col gap-5 justify-center   mt-5 ">
                <h2 className="font-semibold text-lg  self-center inline-block whitespace-nowrap">
                  Conecte seu histórico financeiro 
                </h2>
                <div className = "flex gap-3 items-center">
                  <p className = "text-foreground">
                    Pra que serve?
                  </p>
                  <button onClick={() => setIsOpen(!isOpen)} className={`w-[34px] h-[34px] flex items-center justify-center rounded-lg text-[#9090a8] hover:bg-sidebar-hover hover:text-[#e0e0ef] transition-colors  ${
                    isOpen ? 'bg-sidebar-hover' : ''
                  }`}>
          <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </button>
                </div>
                <div className = "">
                {isOpen && (
                  <div className = "shadow-neu-badge rounded-lg h-auto items-center p-4 flex flex-col gap-2 ">
                    <p className = "text-sm text-foreground">
                      O extrato bancário é um arquivo que seu banco gera com 
todo o seu histórico de transações. Com ele, o Denar 
consegue analisar seus gastos automaticamente, sem você 
precisar digitar nada.


                    </p>
                    <span className = "text-sm text-foreground">
  Para exportar, acesse o app do seu banco → Extrato → 
Exportar → CSV. 
</span>
                  </div>
                  

                )}
                </div>

                {!isOpen && (
                  <CsvUploadButton onClick={() => setIsOpen(!isOpen)} />
                  

                )}

                
                
              </div>
            </Step>

            <Step>
              <div className="flex flex-col gap-5 mt-20 text-center">
                <h2 className="text-3xl text-white">Prontinho!</h2>

                <p className="text-zinc-300">
                  Clique em Entrar para começar sua experiência financeira no Denar!
                </p>
              </div>
            </Step>
          </Stepper>

        </div>
      </div>
    </section>
  );
};

export default Onboarding;