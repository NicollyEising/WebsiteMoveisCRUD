import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './componentes/Navbar.jsx'
import FirstSection from './componentes/FirstSection.jsx'
import SecondSection from './componentes/SecondSection.jsx'
import Banner01 from './componentes/Banner01.jsx'
import Banner02 from './componentes/Banner02.jsx'
import Footer from './componentes/Footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="navbar"><Navbar /></div>
    <div className="column"><FirstSection /></div>
    <div className="column"><Banner01 /></div>
    <div className="column"><SecondSection /></div>
    <div className="column"><Banner01 /></div>
    <div className="column"><Banner02 /></div>
    <div className="column"><Footer /></div>


  </StrictMode>,
)
