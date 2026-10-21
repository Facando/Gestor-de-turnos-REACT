import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { createTurno } from '../services/api'

const HORARIOS = [
  { value: '09:00', label: '09:00 AM' },
  { value: '09:30', label: '09:30 AM' },
  { value: '10:00', label: '10:00 AM' },
  { value: '10:30', label: '10:30 AM' },
  { value: '11:00', label: '11:00 AM' },
  { value: '11:30', label: '11:30 AM' },
  { value: '14:00', label: '02:00 PM' },
  { value: '14:30', label: '02:30 PM' },
  { value: '15:00', label: '03:00 PM' },
  { value: '15:30', label: '03:30 PM' },
  { value: '16:00', label: '04:00 PM' },
  { value: '16:30', label: '04:30 PM' },
  { value: '17:00', label: '05:00 PM' },
]

const SERVICIOS = ['Corte', 'Barba', 'Corte + Barba', 'Tintura']

function ReservarPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nombres: '', email: '', fecha: '', hora: '', motivo: ''
  })
  const [submitting, setSubmitting] = useState(false)

  const today = new Date().toISOString().split('T')[0]

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const fields = [
      { key: 'nombres', label: 'nombre completo' },
      { key: 'email', label: 'email' },
      { key: 'fecha', label: 'fecha' },
      { key: 'hora', label: 'hora' },
      { key: 'motivo', label: 'servicio' },
    ]
    for (const f of fields) {
      if (!form[f.key].trim()) {
        Swal.fire({
          icon: 'error',
          title: 'Campo requerido',
          text: `Por favor ingresa tu ${f.label}`
        })
        return false
      }
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    const confirm = await Swal.fire({
      title: '¿Confirmar reserva?',
      html: `
        <strong>Nombre:</strong> ${form.nombres}<br>
        <strong>Email:</strong> ${form.email}<br>
        <strong>Fecha:</strong> ${form.fecha}<br>
        <strong>Hora:</strong> ${form.hora}<br>
        <strong>Servicio:</strong> ${form.motivo}
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, reservar',
      cancelButtonText: 'Cancelar'
    })

    if (!confirm.isConfirmed) return

    setSubmitting(true)
    try {
      await createTurno(form)
      await Swal.fire({
        icon: 'success',
        title: '¡Turno reservado!',
        text: 'Tu turno ha sido reservado exitosamente. Recibirás un email de confirmación.',
      })
      navigate('/turnos')
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="animate-fade-in-up" style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div className="card">
        <div className="card-header">
          <i className="fas fa-plus"></i>
          <h3>Reservar Turno</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="nombres">Nombre Completo</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombres"
                  name="nombres"
                  value={form.nombres}
                  onChange={handleChange}
                  placeholder="Ej: Juan Pérez"
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
                  placeholder="Ej: juan@email.com"
                />
              </div>
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
                <select
                  className="form-select"
                  id="hora"
                  name="hora"
                  value={form.hora}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar hora...</option>
                  {HORARIOS.map(h => (
                    <option key={h.value} value={h.value}>{h.label}</option>
                  ))}
                </select>
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
                <option value="">Seleccionar servicio...</option>
                {SERVICIOS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="form-actions">
              <Link to="/turnos" className="btn btn-ghost">
                <i className="fas fa-arrow-left"></i> Volver
              </Link>
              <button type="submit" className="btn btn-success" disabled={submitting}>
                {submitting ? (
                  <><div className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }}></div> Procesando...</>
                ) : (
                  <><i className="fas fa-save"></i> Reservar Turno</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ReservarPage
