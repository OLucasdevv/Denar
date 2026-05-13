import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserProvider } from './contexts/UserContext' 
import './index.css'
import App from './app/App.jsx'
import './utils/scrollReveal.js';
import { FinanceProvider } from './contexts/FinanceContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <FinanceProvider>
    <App />
      </FinanceProvider>
    </UserProvider>
  </StrictMode>,
)
