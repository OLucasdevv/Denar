import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabaseClient";
import EyeIcon from '/public/eye.svg'
import EyeOffIcon from '/public/eye-off.svg'
import LoadingSpinner from "@/components/effects/LoadingSpinner";
import FadeContent from "@/components/effects/FadeContent";
import GradientText from "@/components/effects/GradientText";



// ── Features do painel direito ────────────────────────────────────────────────
const FEATURES = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    ),
    title: "Importe em segundos",
    description: "Faça upload do CSV do seu banco e transforme transações confusas em uma visão clara da sua vida financeira.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    ),
    title: "Padrões detectados automaticamente",
    description: "Gastos recorrentes, hábitos financeiros e tendências identificados sem nenhuma planilha manual.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
    title: "Previsão do próximo mês",
    description: "Com base no seu histórico, estimamos compromissos fixos e possíveis apertos financeiros antes que aconteçam.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
    title: "Seus dados são só seus",
    description: "Nada de acesso bancário ou senha do banco. Você envia apenas o extrato que quiser analisar.",
  },
];


const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordtoggle, setpasswordtoggle] = useState(true);

  const verifypassword = (senha, email) => {
    if (senha.length === 0) return 'Por favor, digite sua senha';
    if (email.length === 0) return 'Por favor, digite seu email';
    if (senha.length < 8 || senha.length > 30) return 'A senha deve ter entre 8 e 30 caracteres';
    if (!/[A-Z]/.test(senha)) return 'A senha deve conter pelo menos uma letra maiúscula';
    if (!/[a-z]/.test(senha)) return 'A senha deve conter pelo menos uma letra minúscula';
    if (!/[0-9]/.test(senha)) return 'A senha deve conter pelo menos um número';
    return null;
  };

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: 'http://localhost:5173/onboarding' }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const invalidPassword = verifypassword(senha, email);
    if (invalidPassword) { setError(invalidPassword); return; }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password: senha });
    setLoading(false);

    if (error) {
      const tradutor = {
        "User already registered": "Este e-mail já está cadastrado.",
        "Password should be at least 6 characters": "A senha deve ter pelo menos 6 caracteres.",
      };
      setError(tradutor[error.message] || "Ocorreu um erro ao criar sua conta. Tente novamente.");
      return;
    }

    await fetch('http://localhost:3333/auth/session', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ token: data.session.access_token })
    });

    navigate('/onboarding');
  };

  return (
    <section className="h-screen bg-zinc-900 overflow-hidden">
      <main className="grid grid-cols-1 lg:grid-cols-[40%_60%] h-full">

        {/* ── FORMULÁRIO ────────────────────────────────────────────── */}
        <div className="h-screen flex items-center justify-center px-6 lg:px-0">
          <div className="flex flex-col min-h-[600px] w-full max-w-[450px] bg-[#0f0f0f] p-6 rounded-md gap-7 shadow-2xl shadow-black">

            <h1 className="text-3xl tracking-wider font-medium self-center text-white">
              Crie sua conta
            </h1>

            <p className="self-center text-zinc-300">
              digite seu email e senha para continuar
            </p>

            <button
              onClick={handleGoogle}
              className="flex items-center justify-center w-full px-4 py-2 text-md font-medium text-white transition-colors border border-zinc-500 rounded-lg hover:bg-zinc-800"
            >
              <svg className="w-5 h-5 mr-3" viewBox="-0.5 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fillRule="evenodd">
                  <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" fill="#FBBC05" />
                  <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" fill="#EB4335" />
                  <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" fill="#34A853" />
                  <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" fill="#4285F4" />
                </g>
              </svg>
              Continuar com Google
            </button>

            <div className="flex items-center">
              <div className="flex-grow border-t border-zinc-500" />
              <span className="mx-4 text-sm text-primary">ou</span>
              <div className="flex-grow border-t border-zinc-500" />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-zinc-300">Endereço de Email</p>
                <input
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  className="w-full px-4 py-2 bg-transparent border border-zinc-500 rounded-lg placeholder-zinc-400 text-white focus:border-primary focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1 relative">
                <p className="text-sm text-zinc-300">Sua senha</p>
                <input
                  type={passwordtoggle ? 'password' : 'text'}
                  placeholder="sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full px-4 py-2 bg-transparent border border-zinc-500 rounded-lg placeholder-zinc-400 text-white focus:border-primary focus:outline-none"
                />
                <button
                  type="button"
                  className="right-3 top-11 -translate-y-1/2 absolute"
                  onClick={() => setpasswordtoggle(!passwordtoggle)}
                >
                  <img src={passwordtoggle ? EyeOffIcon : EyeIcon} alt="Eye" className="w-5 h-5" />
                </button>
                <p className="text-xs text-gray-500">
                  sua senha deve ter entre 8-30 caracteres, deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número.
                </p>
              </div>

              {error && (
                <p className="text-red-500 text-sm font-medium animate-in">{error}</p>
              )}

              <button
                onClick={handleSubmit}
                type="submit"
                disabled={loading}
                className="flex items-center justify-center bg-gradient-to-r from-primary to-orange-700 w-full h-10 rounded-lg text-black font-medium mt-5 hover:bg-gradient-to-l hover:from-orange-700 hover:to-primary transition"
              >
                {loading ? <LoadingSpinner color="#000000" size="h-5 w-5" /> : "Criar conta"}
              </button>
            </form>

            <p className="self-center text-zinc-300">
              Já tem uma conta?{" "}
              <Link to={"/loginpage"}>
                <span className="text-primary hover:underline cursor-pointer">Login</span>
              </Link>
            </p>
          </div>
        </div>

        {/* ── PAINEL DIREITO — features ──────────────────────────────── */}
        <FadeContent
duration={4000}
delay={50}
className="hidden lg:flex flex-col justify-center px-20 xl:px-28 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black relative overflow-hidden"
>
        <div className="">

         
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-16 w-[400px] h-[400px] rounded-full bg-orange-700/5 blur-3xl pointer-events-none" />

          {/* Topo — logo + headline */}
          <div className="mb-14">
            <p className="text-primary text-2xl font-semibold tracking-[0.2em] uppercase mb-4 bg-gradient-to-r from-primary to-orange-700 bg-clip-text text-transparent">
              DENAR
            </p>
            <h2 className="text-4xl xl:text-5xl font-medium text-white leading-tight tracking-tight">
  Tudo que você precisa <br />
  <span className="inline-block cursor-default"> 
    <GradientText 
      colors={["#f97316","#c2410c"]}
      animationSpeed={3}
      yoyo = {false}
      
    >
      em um só lugar.
    </GradientText>
  </span>
</h2>
            <p className="mt-4 text-zinc-400 text-base leading-relaxed max-w-md">
              Suba seu extrato e entenda para onde seu dinheiro foi — e para onde vai.
            </p>
          </div>

          {/* Features */}
          <div className="flex flex-col gap-8">
            {FEATURES.map((f, i) => (
              <div key={i} className="flex items-start gap-4 group">

                {/* Ícone */}
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-primary group-hover:bg-primary/10 group-hover:border-primary/30 transition-colors duration-300">
                  {f.icon}
                </div>

                {/* Texto */}
                <div className="flex flex-col gap-1">
                  <p className="text-white font-medium text-sm">{f.title}</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">{f.description}</p>
                </div>

              </div>
            ))}
          </div>

          {/* Linha separadora + rodapé */}
          <div className="mt-14 pt-6 border-t border-zinc-800">
            <p className="text-zinc-600 text-xs">
              Seus dados nunca são compartilhados. Sem acesso à sua conta bancária.
            </p>
          </div>

        </div>
        </FadeContent>
        

      </main>
    </section>
  );
};

export default RegisterPage;