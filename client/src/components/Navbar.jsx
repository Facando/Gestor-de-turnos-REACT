import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <i className="fas fa-calendar-check"></i>
          Gestión de Turnos
        </Link>

        <button
          className="navbar-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir menú"
        >
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>

        <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
          <li>
            <NavLink to="/" end onClick={closeMenu}>
              <i className="fas fa-home"></i> Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/turnos" onClick={closeMenu}>
              <i className="fas fa-list"></i> Turnos
            </NavLink>
          </li>
          <li>
            <NavLink to="/reservar" onClick={closeMenu}>
              <i className="fas fa-plus"></i> Reservar
            </NavLink>
          </li>
          <li>
            <NavLink to="/contacto" onClick={closeMenu}>
              <i className="fas fa-envelope"></i> Contacto
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
