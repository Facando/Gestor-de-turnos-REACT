import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { getTurnos, deleteTurno } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'

function TurnosPage() {
  const [turnos, setTurnos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const cargarTurnos = () => {
    setLoading(true)
    getTurnos()
      .then(data => {
        setTurnos(data)
        setError(null)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    cargarTurnos()
  }, [])

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Sí, eliminar!',
      cancelButtonText: 'Cancelar'
    })

    if (result.isConfirmed) {
      try {
        await deleteTurno(id)
        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: 'El turno ha sido eliminado exitosamente.',
          timer: 1500,
          showConfirmButton: false
        })
        cargarTurnos()
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.message
        })
      }
    }
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  const formatTime = (timeStr) => {
    if (!timeStr) return ''
    return timeStr.substring(0, 5)
  }

  if (loading) return <LoadingSpinner text="Cargando turnos..." />

  return (
    <div className="animate-fade-in-up">
      <div className="page-header">
        <h2><i className="fas fa-list"></i> Lista de Turnos</h2>
        <Link to="/reservar" className="btn btn-success">
          <i className="fas fa-plus"></i> Nuevo Turno
        </Link>
      </div>

      {error && (
        <div className="alert alert-error">
          <i className="fas fa-exclamation-circle"></i> {error}
        </div>
      )}

      {turnos.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <i className="fas fa-calendar-times"></i>
            <h5>No hay turnos registrados</h5>
            <p>Comienza reservando tu primer turno.</p>
            <Link to="/reservar" className="btn btn-primary">
              <i className="fas fa-plus"></i> Reservar Primer Turno
            </Link>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Servicio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {turnos.map(turno => (
                  <tr key={turno.id}>
                    <td>{turno.id}</td>
                    <td style={{ color: 'var(--text-primary)' }}>{turno.nombres}</td>
                    <td>{turno.email}</td>
                    <td>{formatDate(turno.fecha)}</td>
                    <td>{formatTime(turno.hora)}</td>
                    <td>
                      <span className="badge badge-primary">{turno.motivo}</span>
                    </td>
                    <td>
                      <div className="actions">
                        <Link
                          to={`/turnos/editar/${turno.id}`}
                          className="btn btn-warning btn-sm"
                          title="Editar"
                        >
                          <i className="fas fa-edit"></i>
                        </Link>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(turno.id)}
                          title="Eliminar"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default TurnosPage
