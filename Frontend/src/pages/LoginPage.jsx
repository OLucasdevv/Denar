import { useState } from "react";
import { Link } from "react-router-dom";
import EyeIcon from '/public/eye.svg'
import EyeOffIcon from '/public/eye-off.svg'
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "@/components/effects/LoadingSpinner";
import { supabase } from "@/supabaseClient";


const LoginPage = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('');
  const [senha, setSenha] = useState ('');
  const [email, setEmail] = useState ('');
  const [loading, setLoading] = useState(false);
  const [passwordtoggle, setpasswordtoggle] = useState (true);

  const handleGoogle = async () => {
  await supabase.auth.signInWithOAuth({ 
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:5173/dashboard'
    }
  })
}
  const verifyequality = (senha, email) => {
    if (senha.length === 0) {
      return 'Por favor, digite sua senha'
    }
    if (email.length === 0) {
      return 'Por favor, digite seu email'
    }
    return null;
    
  }

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  const invalidPassword = verifyequality(senha, email);
  if (invalidPassword) {
    setError(invalidPassword);
    return;
  }

  setLoading(true);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: senha
  });

  setLoading(false);

  if (error) {
    const tradutor = {
      "Invalid login credentials": "E-mail ou senha incorretos.",
      "User not found": "Usuário não encontrado.",
      "Email not confirmed": "Por favor, confirme seu e-mail antes de entrar."
    };
    setError(tradutor[error.message] || "Ocorreu um erro ao tentar entrar. Tente novamente.");
    return;
  }

  await fetch('http://localhost:3333/auth/session', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ token: data.session.access_token })
  });

  navigate('/dashboard');
};

  
  return (
    <section className="h-screen bg-zinc-900">
      
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col min-h-[600px] w-[450px] bg-[#0f0f0f] p-6 rounded-md gap-7 shadow-2xl shadow-black">
          
          <h1 className="text-3xl tracking-wider font-medium self-center text-white">
            Entrar no DENAR
          </h1>

          <p className="self-center text-zinc-300">
            digite seu email e senha para continuar
          </p>

          <button onClick={handleGoogle}  className="flex items-center justify-center w-full px-4 py-2 text-md font-medium text-white transition-colors border border-zinc-500 rounded-lg hover:bg-zinc-800">
            <svg
              className="w-5 h-5 mr-3"
              viewBox="-0.5 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fillRule="evenodd">
                <path
                  d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                  fill="#FBBC05"
                />
                <path
                  d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                  fill="#EB4335"
                />
                <path
                  d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                  fill="#34A853"
                />
                <path
                  d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                  fill="#4285F4"
                />
              </g>
            </svg>

            Continuar com  Google
          </button>

          <div className="flex items-center">
            <div className="flex-grow border-t border-zinc-500"></div>
            <span className="mx-4 text-sm text-primary">ou</span>
            <div className="flex-grow border-t border-zinc-500"></div>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-sm text-zinc-300">Endereço de Email</p>

            <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="seuemail@exemplo.com"
              className="w-full px-4 py-2 bg-transparent border border-zinc-500 rounded-lg placeholder-zinc-400 text-white focus:border-primary focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1 relative">
            <div className="flex justify-between">
              <p className="text-sm text-zinc-300">Sua senha</p>

              <a
                href="/reset-password"
                className="text-sm text-primary hover:underline"
              >
                Esqueceu sua senha?
              </a>
            </div>

                          <input
                         type={passwordtoggle ? 'password' : 'text'}
                         placeholder="sua senha"
                         value={senha}
                         onChange={(e) => setSenha(e.target.value)}
                         className="w-full px-4 py-2 bg-transparent border border-zinc-500 rounded-lg placeholder-zinc-400 text-white focus:border-primary focus:outline-none "
                       />
                       <button type="button" className = "right-3 top-11 -translate-y-1/2 absolute" onClick={(e) => { 
                        e.preventDefault();
                        setpasswordtoggle (!passwordtoggle);
                        
                        } }>
                           <img src={passwordtoggle ? EyeOffIcon : EyeIcon} alt="Eye" className="w-5 h-5" />
                       </button>
          </div>

{error && (
  <p className="text-red-600 text-sm font-medium animate-in">
    {error}
  </p>
)}
          <button onClick= {handleSubmit} className=" flex items-center justify-center bg-gradient-to-r from-primary to-orange-700 w-full  h-10 rounded-lg text-black font-medium mt-5 hover:bg-gradient-to-l hover:from-orange-700 hover:to-primary transition">
            {!loading && (
              "Entrar"
            )}
            {loading && (
              <LoadingSpinner
              color="#000000"
              size="h-5 w-5"
              />
            )}
          </button>

          <p className="self-center text-zinc-300">
            Não tem uma conta?{" "}
            <Link
            to={"/registerpage"}
            >
            <a  className="text-primary hover:underline">
              Criar conta
            </a>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;