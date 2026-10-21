import { useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { sendContacto } from '../services/api'

function ContactoPage() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.nombre || !form.email || !form.mensaje) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Todos los campos son obligatorios' })
      return
    }

    setSubmitting(true)
    try {
      const data = await sendContacto(form)
      Swal.fire({
        icon: 'success',
        title: '¡Mensaje enviado!',
        text: data.message
      })
      setForm({ nombre: '', email: '', mensaje: '' })
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="animate-fade-in-up" style={{ maxWidth: '700px', margin: '0 auto' }}>
      {/* Form Card */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-header" style={{ borderColor: 'rgba(6, 182, 212, 0.3)' }}>
          <i className="fas fa-envelope" style={{ color: 'var(--accent-info)' }}></i>
          <h3>Contacto</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="nombre">Nombre Completo</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Tu nombre"
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
                placeholder="tu@email.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="mensaje">Mensaje</label>
              <textarea
                className="form-control"
                id="mensaje"
                name="mensaje"
                rows="5"
                value={form.mensaje}
                onChange={handleChange}
                placeholder="Escribe tu mensaje aquí..."
              ></textarea>
            </div>

            <div className="form-actions">
              <Link to="/" className="btn btn-ghost">
                <i className="fas fa-arrow-left"></i> Volver
              </Link>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? (
                  <><div className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }}></div> Enviando...</>
                ) : (
                  <><i className="fas fa-paper-plane"></i> Enviar Mensaje</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Info Card */}
      <div className="card">
        <div className="card-body">
          <h5 style={{ fontWeight: 600, marginBottom: '1rem' }}>Información de Contacto</h5>
          <div className="contact-info-grid">
            <div className="contact-info-item">
              <i className="fas fa-map-marker-alt" style={{ color: 'var(--accent-primary-light)' }}></i>
              <strong>Dirección</strong>
              <span>Av. Principal 123<br />Ciudad, País</span>
            </div>
            <div className="contact-info-item">
              <i className="fas fa-phone" style={{ color: 'var(--accent-success-light)' }}></i>
              <strong>Teléfono</strong>
              <span>+1 234 567 8900</span>
            </div>
            <div className="contact-info-item">
              <i className="fas fa-clock" style={{ color: 'var(--accent-warning-light)' }}></i>
              <strong>Horarios</strong>
              <span>Lun-Vie: 9:00-17:00<br />Sáb: 9:00-12:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactoPage
