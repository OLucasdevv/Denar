import Navbar from "../components/navigationbars/LandingNavbar";
import { useIntersectionObserver } from "../utils/scrollReveal";
import FeatureCards from "../components/layouts/FeatureCards";
import LogoLoop from "../components/layouts/LogoLoop";
import { Link } from "react-router-dom";
import Chart from "@/components/charts/SpendingPaceChart";
import AnimatedContent from "@/components/effects/AnimatedContent";
import { useSmoothScroll } from "@/components/effects/useSmoothScroll";
import DenarMacbook from "@/components/layouts/Macbook";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabaseClient";
import ScrollStack, { ScrollStackItem } from "@/components/layouts/ScrollStack";


const LandingPage = () => {

  const navigate = useNavigate();
  const handleStart = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      navigate("/dashboard");
    } else {
      navigate("/registerpage");
    }
  };
  useSmoothScroll();

  const imageLogos = [
    { src: "nuLogo.png", alt: "Nubank" },
    { src: "itauLogo.png", alt: "Inter" },
    { src: "bradescoLogo.png", alt: "Bradesco" },
    { src: "safraLogo.png", alt: "Safra" },
    { src: "btgLogo.png", alt: "BTG" },
    { src: "xpLogo.png", alt: "Vite" },
  ];

  const features = [
    {
      title: "Importe seu extrato em segundos.",
      description: "Faça upload do CSV do seu banco e transforme transações confusas em uma visão clara da sua vida financeira.",
      image: "/sync.svg"
    },
    {
      title: "Descubra pra onde seu dinheiro vai.",
      description: "Detectamos padrões, gastos recorrentes e hábitos financeiros automaticamente — sem planilha manual.",
      image: "/expanses.svg"
    },
    {
      title: "Entenda seu próximo mês antes dele chegar.",
      description: "Com base no seu histórico, estimamos compromissos fixos, tendência de gastos e possíveis apertos financeiros.",
      image: "/chart.svg"
    },
    {
      title: "Seus dados continuam seus.",
      description: "Nada de acesso bancário ou senha. Você envia apenas o extrato que quiser analisar.",
      image: "/secureData.svg"
    }
  ];

  const [ref1, isVisible1] = useIntersectionObserver({ threshold: 0.2, rootMargin: '-50px' });
  const [ref2, isVisible2] = useIntersectionObserver({ threshold: 0.25 });

  return (
    <>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="h-auto lg:h-[900px]">

        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 lg:min-h-screen items-center px-6 md:px-12 lg:ml-28 lg:px-0 pt-24 pb-10 lg:pt-0 lg:pb-0">

          {/* Texto — centralizado no mobile, esquerda no desktop */}
          <div className="flex flex-col gap-6 items-center lg:items-start">

            <AnimatedContent
              distance={60}
              direction="vertical"
              reverse={false}
              duration={0.5}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              scale={1}
              threshold={0.1}
              delay={0.1}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight flex flex-col gap-3 lg:gap-5 font-medium text-center lg:text-left">
                Seu dinheiro explicado. <br />
                <span className="bg-gradient-to-r from-gray-800 to-gray-500 bg-clip-text text-transparent">
                  Antes que ele desapareça.
                </span>
              </h1>
            </AnimatedContent>

            <AnimatedContent
              distance={40}
              direction="vertical"
              reverse={false}
              duration={0.5}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              scale={1}
              threshold={0.1}
              delay={0.20}
            >
              <p className="tracking-wide text-gray-700 text-base lg:text-xl text-center lg:text-left">
                Suba seu extrato bancário e receba insights claros{" "}
                <span className="hidden lg:inline"><br /></span>
                sobre seus gastos, padrões e previsões financeiras.
              </p>
            </AnimatedContent>

            <AnimatedContent
              distance={60}
              direction="vertical"
              reverse={false}
              duration={0.5}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              scale={1}
              threshold={0.1}
              delay={0.35}
            >
              <button
                className="
    text-black text-[20px] py-3 px-6 rounded-full 
  bg-gradient-to-r from-primary via-orange-400 to-orange-500 
  bg-[length:200%_auto] 
  shadow-md 
  transition-all duration-500 ease-out
  hover:bg-right  hover:shadow-primary hover:-translate-y-0.1 hover:shadow-md

  active:scale-95
"
                onClick={handleStart}
              >
                Comece agora
              </button>
            </AnimatedContent>

            {/* MacBook — mobile: card arredondado logo abaixo do botão */}
            <div
              className="lg:hidden w-full mt-2 rounded-3xl overflow-hidden bg-gray-50"
              style={{ height: "320px" }}
            >
              <DenarMacbook />
            </div>

          </div>

          {/* MacBook — desktop: coluna direita, tamanho e comportamento originais */}
          <AnimatedContent
            distance={119}
            direction="horizontal"
            reverse={false}
            duration={0.8}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={1}
            threshold={0.1}
            delay={0.1}
          >
            <div className="hidden lg:block">
              <DenarMacbook />
            </div>
          </AnimatedContent>

        </div>
      </section>

      {/* ── FUNCIONALIDADES ──────────────────────────────────────── */}
      <section id="funcionalidades" className="h-auto lg:h-[840px] py-16 lg:py-0">

        <div className="flex flex-col gap-10 items-center">
          <div
            ref={ref1}
            className={`flex flex-col gap-9 items-center transition-all duration-1000 text-center px-6 lg:px-0 ${
              isVisible1
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <button className="rounded-full h-10 w-40 border border-black">
              Funcionalidades
            </button>

            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-thin tracking-wide">
              Tudo que você precisa para{" "}
              <span className="hidden lg:inline">
                <br />
                <span className="inline-block pl-16 mt-2"> gerenciar seus gastos. </span>
              </span>
              <span className="lg:hidden"> gerenciar seus gastos.</span>
            </h1>

            <p className="text-gray-700 text-sm sm:text-base">
              Funcionalidades poderosas feitas para te ajudar a rastrear, controlar e crescer seu dinheiro{" "}
              <span className="hidden lg:inline">
                <br />
                <span className="inline-block pl-[290px]"> com facilidade </span>
              </span>
              <span className="lg:hidden"> com facilidade</span>
            </p>
          </div>
        </div>

        <div
          ref={ref2}
          className={`items-center transition-all duration-1000 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-20 max-w-7xl mx-auto mt-10 lg:mt-20 px-6 md:px-10 lg:px-0 ${
            isVisible2
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          {features.map((info, index) => (
            <FeatureCards
              key={index}
              title={info.title}
              description={info.description}
              image={info.image}
            />
          ))}
        </div>

      </section>

      {/* ── BANCOS + SCROLL STACK ─────────────────────────────────── */}
      <section className="h-auto">
        <div className="flex flex-col gap-16 justify-center py-10 lg:py-0">

          <h1 className="text-gray-700 self-center text-sm sm:text-base text-center px-4">
            Nos conectamos com os principais bancos
          </h1>

          <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
            <LogoLoop
              logos={imageLogos}
              speed={100}
              direction="left"
              logoHeight={55}
              gap={60}
              hoverSpeed={1}
              scaleOnHover
              fadeOut
              fadeOutColor="#ffffff"
              ariaLabel="Bancos Suportados"
            />
          </div>

          <ScrollStack>
            <ScrollStackItem>
              <h2>Card 1</h2>
              <p>This is the first card in the stack</p>
            </ScrollStackItem>
            <ScrollStackItem>
              <h2>Card 2</h2>
              <p>This is the second card in the stack</p>
            </ScrollStackItem>
            <ScrollStackItem>
              <h2>Card 3</h2>
              <p>This is the third card in the stack</p>
            </ScrollStackItem>
          </ScrollStack>

        </div>
      </section>
    </>
  );
};

export default LandingPage;