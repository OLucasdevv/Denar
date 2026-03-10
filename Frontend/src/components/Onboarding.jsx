import { useState } from "react";
import Stepper, { Step } from "./Stepper";

const Onboarding = () => {
  const [OnboardingData, setOnboardingData] = useState({
    name: "",
    income: "",
  });

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
    <section className="h-screen bg-zinc-900">
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col h-[600px] w-[450px] bg-[#0f0f0f] p-6 rounded-md shadow-2xl shadow-black">

          <Stepper
            className="h-full text-white"
            initialStep={1}
            onStepChange={(step) => setCurrentStep(step)}
            onFinalStepCompleted={() => console.log("All steps completed!")}
            backButtonText="Voltar"
            nextButtonText="Próximo"
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
              <div className="flex flex-col gap-10 justify-center mt-20">
                <h2 className="text-zinc-300 self-center">
                  Qual é sua renda mensal?
                </h2>

                <input
                  type="number"
                  placeholder="digite sua renda mensal"
                  className="w-full px-4 py-2 bg-transparent border border-zinc-500 rounded-lg placeholder-zinc-400 text-white focus:border-primary focus:outline-none"
                  value={OnboardingData.income}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9.,]/g, "");

                    setOnboardingData({
                      ...OnboardingData,
                      income: value,
                    });
                  }}
                />
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