const db = require('../config/database');
const nodemailer = require('../utils/mailer');

// Obtener todos los turnos
const obtenerTurnos = (req, res) => {
  const sql = "SELECT * FROM turnos ORDER BY fecha, hora";
  db.query(sql, (err, rows) => {
    if (err) {
      console.error(' Error al obtener turnos:', err);
      return res.status(500).render('error', { error: 'Error al obtener turnos: ' + err.message });
    }

    const mensaje = req.query.mensaje;
    const tipoMensaje = req.query.tipo || 'success';
    
    res.render('turnos', { 
      turnos: rows, 
      title: 'Lista de Turnos',
      mensaje: mensaje,
      tipoMensaje: tipoMensaje
    });
  });
};

// Mostrar formulario para crear turno
const mostrarFormularioCrear = (req, res) => {
  res.render('reservar', { title: 'Reservar Turno' });
};

// Crear nuevo turno
const crearTurno = (req, res) => {
  const { nombres, email, fecha, hora, motivo } = req.body;

  
  // Validación 
  if (!nombres || !email || !fecha || !hora || !motivo) {
    return res.render('reservar', {
      title: 'Reservar Turno',
      error: 'Todos los campos son obligatorios',
      sweetAlert: {
        type: 'error',
        title: 'Campos incompletos',
        text: 'Todos los campos son obligatorios. Por favor completa el formulario.'
      }
    });
  }
  
  console.log(' Creando turno:', { nombres, email, fecha, hora, motivo });
  
  const sql = "INSERT INTO turnos (nombres, email, fecha, hora, motivo) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [nombres, email, fecha, hora, motivo], (err, result) => {
    if (err) {
      console.error(' Error al crear turno:', err);
      
      // Error específico para columna faltante
      if (err.message.includes('Unknown column')) {
        return res.render('reservar', {
          title: 'Reservar Turno',
          sweetAlert: {
            type: 'error',
            title: 'Error de base de datos',
            text: 'Error en la estructura de la base de datos. Por favor ejecuta el script gestion_turnos.sql en phpMyAdmin para corregir la tabla. Verifica que WAMP Server esté ejecutándose.'
          }
        });
      }
      
      return res.render('reservar', {
        title: 'Reservar Turno',
        sweetAlert: {
          type: 'error',
          title: 'Error al crear turno',
          text: 'Error al crear turno: ' + err.message + '. Por favor intenta nuevamente.'
        }
      });
    }
    
    console.log('Turno creado exitosamente:', result.insertId);
    
    // Enviar email de confirmación
    try {
      nodemailer.enviarConfirmacion(email, nombres, fecha, hora, motivo);
    } catch (emailError) {
      console.warn(' Error enviando email (turno creado exitosamente):', emailError.message);
    }
    
    // Respuesta exitosa con Sweet Alert
    return res.render('reservar', {
      title: 'Reservar Turno',
      sweetAlert: {
        type: 'success',
        title: '¡Turno reservado!',
        text: 'Tu turno ha sido reservado exitosamente. Recibirás un email de confirmación.',
        redirect: '/turnos'
      }
    });
  });
};

// Mostrar formulario para editar turno
const mostrarFormularioEditar = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM turnos WHERE id = ?";
  
  db.query(sql, [id], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).render('error', { error: 'Error al obtener turno' });
    }
    if (rows.length === 0) {
      return res.status(404).render('error', { error: 'Turno no encontrado' });
    }
    res.render('editar', { turno: rows[0], title: 'Editar Turno' });
  });
};

// Actualizar turno
const actualizarTurno = (req, res) => {
  const id = req.params.id;
  const { nombres, email, fecha, hora, motivo } = req.body;
  
  const sql = "UPDATE turnos SET nombres = ?, email = ?, fecha = ?, hora = ?, motivo = ? WHERE id = ?";
  db.query(sql, [nombres, email, fecha, hora, motivo, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).render('error', { error: 'Error al actualizar turno' });
    }
    
    console.log('Turno actualizado exitosamente:', id);
    
    // Enviar email de confirmación de actualización
    try {
      nodemailer.enviarConfirmacionActualizacion(email, nombres, fecha, hora, motivo);
    } catch (emailError) {
      console.warn('Error enviando email (turno actualizado exitosamente):', emailError.message);
    }
    
    res.redirect('/turnos?mensaje=Turno actualizado exitosamente. Se ha enviado un email de confirmación.');
  });
};

// Eliminar turno
const eliminarTurno = (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM turnos WHERE id = ?";
  

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).render('error', { error: 'Error al eliminar turno' });
      
    }
    res.redirect('/turnos?mensaje=Turno eliminado exitosamente');
  });
  
};



module.exports = {
  obtenerTurnos,
  mostrarFormularioCrear,
  crearTurno,
  mostrarFormularioEditar,
  actualizarTurno,
  eliminarTurno
}; 