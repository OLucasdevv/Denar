import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { supabase } from "@/supabaseClient"

const ProtectedRoute = ({ children }) => {
  const [session, setSession] = useState(undefined)
  const [tokenValido, setTokenValido] = useState(undefined)

  useEffect(() => {
    async function getSession() {
        const { data: { session } } = await supabase.auth.getSession()
        setSession(session)

        const response = await fetch('http://localhost:3333/auth/verify', {
  credentials: 'include'
})
const isValid = response.ok 
setTokenValido(isValid)
        
        
    }
    getSession()
  }, [])

  // enquanto carrega
  if (session === undefined || tokenValido === undefined) return null

if (!session || !tokenValido) return <Navigate to="/loginpage" />

  // se tiver sessão, renderiza a página
  return children
}

export default ProtectedRoute