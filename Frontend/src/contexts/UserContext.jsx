import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "@/supabaseClient"

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        await fetch('http://localhost:3333/auth/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ token: session.access_token })
        });
        setUser(session.user);
      } else {
        setUser(null);
      }
    }
    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);

      if (session?.access_token) {
        await fetch('http://localhost:3333/auth/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ token: session.access_token })
        });
      } else {
        await fetch('http://localhost:3333/auth/logout', { method: 'POST', credentials: 'include' });
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}