import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import TurnosPage from './pages/TurnosPage'
import ReservarPage from './pages/ReservarPage'
import EditarPage from './pages/EditarPage'
import ContactoPage from './pages/ContactoPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <>
      <Navbar />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/turnos" element={<TurnosPage />} />
          <Route path="/reservar" element={<ReservarPage />} />
          <Route path="/turnos/reservar" element={<ReservarPage />} />
          <Route path="/turnos/editar/:id" element={<EditarPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
