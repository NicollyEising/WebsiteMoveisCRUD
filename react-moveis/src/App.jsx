import { Routes, Route } from 'react-router-dom'
import Navbar from './componentes/Navbar.jsx'
import FirstSection from './componentes/FirstSection.jsx'
import SecondSection from './componentes/SecondSection.jsx'
import Banner01 from './componentes/Banner01.jsx'
import Banner02 from './componentes/Banner02.jsx'
import Footer from './componentes/Footer.jsx'
import SecondPage from './secondPage.jsx'
import ThirdPage from "./thirdPage";
import FourPage from "./fourPage";
import FifthPage from "./fifthPage";
import SixPage from "./sixPage";
import SevenPage from "./sevenPage";
import EightPage from "./eightPage";
function HomePage() {
  return (
    <>
      <Navbar />
      <FirstSection />
      <Banner01 />
      <SecondSection />
      <Banner01 />
      <Banner02 />
      <Footer />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/secondPage/:id" element={<SecondPage />} />
      <Route path="/produtos/:nome" element={<ThirdPage />} />
      <Route path="/fourPage" element={<FourPage />} />
      <Route path="/fifthPage" element={<FifthPage />} />
      <Route path="/sixPage/:id" element={<SixPage />} />
      <Route path="/sevenPage" element={<SevenPage />} />
      <Route path="/eightPage" element={<EightPage />} />
    </Routes>
  )
}

export default App
