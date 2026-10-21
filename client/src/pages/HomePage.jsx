import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getTurnosCount } from '../services/api'

function HomePage() {
  const [count, setCount] = useState(null)

  useEffect(() => {
    getTurnosCount()
      .then(data => setCount(data.count))
      .catch(() => setCount(0))
  }, [])

  return (
    <div className="animate-fade-in-up">
      {/* Hero */}
      <section className="hero">
        <h1>
          <i className="fas fa-calendar-check" style={{ marginRight: '0.5rem' }}></i>
          Gestión de Turnos
        </h1>
        <p className="subtitle">
          Sistema completo para gestionar turnos y citas de manera eficiente.
          Reserva, consulta, modifica y cancela turnos fácilmente.
        </p>
        <div className="hero-actions">
          <Link to="/reservar" className="btn btn-success btn-lg">
            <i className="fas fa-plus"></i> Reservar Turno
          </Link>
          <Link to="/turnos" className="btn btn-primary btn-lg">
            <i className="fas fa-list"></i> Ver Turnos
          </Link>
        </div>
      </section>

      {/* Contador */}
      <div style={{ maxWidth: '400px', margin: '0 auto 2.5rem' }}>
        <div className="stat-card">
          <div className="stat-number">
            {count === null ? '...' : count}
          </div>
          <div className="stat-label">
            {count === 1 ? 'Turno registrado' : 'Turnos registrados'}
          </div>
          <i className="fas fa-calendar-check"></i>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid-3 stagger">
        <div className="feature-card">
          <div className="icon-wrapper primary">
            <i className="fas fa-clock"></i>
          </div>
          <h5>Reservar Turnos</h5>
          <p>Programa tus citas de manera rápida y sencilla.</p>
          <Link to="/reservar" className="btn btn-primary btn-sm">
            Ir a Reservar
          </Link>
        </div>

        <div className="feature-card">
          <div className="icon-wrapper success">
            <i className="fas fa-edit"></i>
          </div>
          <h5>Gestionar Turnos</h5>
          <p>Modifica o cancela tus turnos cuando lo necesites.</p>
          <Link to="/turnos" className="btn btn-success btn-sm">
            Ver Turnos
          </Link>
        </div>

        <div className="feature-card">
          <div className="icon-wrapper warning">
            <i className="fas fa-envelope"></i>
          </div>
          <h5>Contacto</h5>
          <p>Envía un mensaje o consulta directamente.</p>
          <Link to="/contacto" className="btn btn-warning btn-sm">
            Ir a Contacto
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage
