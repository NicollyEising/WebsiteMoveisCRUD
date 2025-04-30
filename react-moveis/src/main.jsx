import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './componentes/Navbar.jsx'
import FirstSection from './componentes/FirstSection.jsx'
import SecondSection from './componentes/SecondSection.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="navbar"><Navbar /></div>
    <div className="column"><FirstSection /></div>
    <div className="column"><SecondSection /></div>

  </StrictMode>,
)
