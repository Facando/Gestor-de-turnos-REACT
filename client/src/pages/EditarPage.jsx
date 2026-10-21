import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { getTurno, updateTurno } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'

const SERVICIOS = ['Corte', 'Barba', 'Corte + Barba', 'Tintura']

function EditarPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nombres: '', email: '', fecha: '', hora: '', motivo: ''
  })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    getTurno(id)
      .then(data => {
        setForm({
          nombres: data.nombres || '',
          email: data.email || '',
          fecha: data.fecha ? data.fecha.substring(0, 10) : '',
          hora: data.hora ? data.hora.substring(0, 5) : '',
          motivo: data.motivo || ''
        })
      })
      .catch(err => {
        Swal.fire({ icon: 'error', title: 'Error', text: err.message })
        navigate('/turnos')
      })
      .finally(() => setLoading(false))
  }, [id, navigate])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.nombres || !form.email || !form.fecha || !form.hora || !form.motivo) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Todos los campos son obligatorios' })
      return
    }

    setSubmitting(true)
    try {
      await updateTurno(id, form)
      await Swal.fire({
        icon: 'success',
        title: '¡Turno actualizado!',
        text: 'Los cambios se guardaron exitosamente. Se ha enviado un email de confirmación.',
      })
      navigate('/turnos')
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err.message })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <LoadingSpinner text="Cargando turno..." />

  return (
    <div className="animate-fade-in-up" style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div className="card">
        <div className="card-header" style={{ borderColor: 'rgba(245, 158, 11, 0.3)' }}>
          <i className="fas fa-edit" style={{ color: 'var(--accent-warning-light)' }}></i>
          <h3>Editar Turno</h3>
        </div>
        <div className="card-body">
          <div className="alert alert-info" style={{ marginBottom: '1.5rem' }}>
            <i className="fas fa-info-circle"></i>
            <span><strong>Nota:</strong> Al actualizar tu turno, recibirás un email de confirmación con los nuevos detalles.</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="nombres">Nombre Completo</label>
              <input
                type="text"
                className="form-control"
                id="nombres"
                name="nombres"
                value={form.nombres}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="fecha">Fecha</label>
                <input
                  type="date"
                  className="form-control"
                  id="fecha"
                  name="fecha"
                  min={today}
                  value={form.fecha}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="hora">Hora</label>
                <input
                  type="time"
                  className="form-control"
                  id="hora"
                  name="hora"
                  value={form.hora}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="motivo">Servicio</label>
              <select
                className="form-select"
                id="motivo"
                name="motivo"
                value={form.motivo}
                onChange={handleChange}
              >
                <option value="">Selecciona un servicio</option>
                {SERVICIOS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="form-actions">
              <Link to="/turnos" className="btn btn-ghost">
                <i className="fas fa-arrow-left"></i> Cancelar
              </Link>
              <button type="submit" className="btn btn-warning" disabled={submitting}>
                {submitting ? (
                  <><div className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }}></div> Guardando...</>
                ) : (
                  <><i className="fas fa-save"></i> Actualizar Turno</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditarPage
