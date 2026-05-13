import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { supabase } from "@/supabaseClient"

const ProtectedRoute = ({ children }) => {
  const [session, setSession] = useState(undefined)
  const [tokenValido, setTokenValido] = useState(undefined)

  useEffect(() => {
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      setSession(currentSession)

      
      if (currentSession) {
        try {
          const response = await fetch('http://localhost:3333/auth/verify', {
            credentials: 'include'
          })
          setTokenValido(response.ok)
        } catch (error) {
          setTokenValido(false)
        }
      } else {
        
        setTokenValido(false)
      }
    })

    
    return () => subscription.unsubscribe()
  }, [])

  if (session === undefined || tokenValido === undefined) {
    return null 
  }

  if (!session || !tokenValido) {
    return <Navigate to="/loginpage" replace state={{ message: "Sua sessão expirou. Faça login novamente." }} />
  }

  
  return children
}

export default ProtectedRoute