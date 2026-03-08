import Navbar from "../components/Navbar";
import { useIntersectionObserver } from "../utils/scrollReveal";
import FeatureCards from "../components/featureCards";

const LandingPage = () => {

const features = [
  {
    title: "Todas as contas unificadas",
    description: "Conecte seus bancos via Open Finance. Tudo sincronizado automaticamente em um dashboard inteligente.",
    image: ""
  },
  {
    title: "Entenda seus gastos",
    description: "Categorização automática e alertas personalizados. Veja exatamente onde você pode economizar.",
    image: ""
  },
  {
    title: "Projete seus gastos futuros",
    description: "Baseado no seu histórico, projetamos seus gastos futuros. Planeje com tranquilidade.",
    image: ""
  },
  {
    title: "Segurança garantida",
    description: "Integração segura via Open Finance. Criptografia de ponta e zero armazenamento de senhas.",
    image: ""
  }
];

    const [ref1, isVisible1] = useIntersectionObserver({ threshold: 0.6,
        rootMargin: '-50px'
     });
  const [ref2, isVisible2] = useIntersectionObserver({ threshold: 0.3 });
  
    return ( 
        <>
        <section className = "h-screen">
            <Navbar />
            <div className = "grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 min-h-screen  ml-28">
                <div className = " flex flex-col gap-6 mt-60    ">
                <h1 className = "text-6xl tracking-tight flex flex-col gap-5 font-medium">
                    Seu dinheiro explicado. <br />
                    <spam className = "bg-gradient-to-b from-gray-900 to-gray-500 bg-clip-text text-transparent">
                        Antes que ele desapareça.
                    </spam>
                </h1>
                <p className = "tracking-wide text-gray-700 text-xl">
                    Conecte suas contas bancárias e receba insights claros <br /> sobre seus gastos, padrões e previsões financeiras.
                </p>
                <button className = "h-10 w-40 bg- text-white rounded-lg bg-black shadow-md hover:shadow-xl transition-shadow">
                    Comece agora
                </button>
                </div>
                <div className = "flex flex-col  ">
                    <img  
                        src = "/card.png"
                        className = "mt-16  drop-shadow-2xl hover:scale-110 transition-transform duration-500"
                    />
                    
                </div>
            </div>
        </section>
        
        <section className = "h-screen ">
            <div className = "flex flex-col gap-10 items-center">
                <div ref={ref1}
        className={` flex flex-col gap-9 items-center transition-all duration-1000   ${
          isVisible1 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}
      >
                <button className = "rounded-full h-10 w-40 border border-black ">
                        Funcionalidades
                </button>
                <h1 className = "text-5xl font-thin tracking-wide ">
                    Tudo que você precisa para <br />
                     <span className = "inline-block pl-16 mt-2"> gerenciar seus gastos. </span>
                </h1>
                <p className = "text-gray-700 ">
                    Funcionalidades poderosas feitas para te ajudar a rastrear, controlar e crescer seu dinheiro <br /> 
                    <span className = "inline-block pl-[290px]"> com facilidade </span>
                </p>
                </div>
            </div>

            <div className = "grid grid-cols-3 gap-20 max-w-7xl mx-auto mt-10 ">
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
          
        </>
    )
};
export default LandingPage;