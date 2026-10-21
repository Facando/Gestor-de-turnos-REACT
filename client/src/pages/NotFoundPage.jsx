import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="not-found animate-fade-in-up">
      <div className="error-code">404</div>
      <h2>Página no encontrada</h2>
      <p>La página que buscas no existe o fue movida.</p>
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/" className="btn btn-primary">
          <i className="fas fa-home"></i> Volver al Inicio
        </Link>
        <Link to="/turnos" className="btn btn-ghost">
          <i className="fas fa-calendar"></i> Ver Turnos
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
