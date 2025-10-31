import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// providers
import { OptionsProvider } from './contexts/QuestionsOptions/Options.tsx'


createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <OptionsProvider>
         <App />
      </OptionsProvider>
   </StrictMode>,
)
