const db = require('../config/database');
const mailer = require('../utils/mailer');

// GET /api/turnos — Obtener todos los turnos
const obtenerTurnos = (req, res) => {
  const sql = "SELECT * FROM turnos ORDER BY fecha, hora";
  db.query(sql, (err, rows) => {
    if (err) {
      console.error('Error al obtener turnos:', err);
      return res.status(500).json({ error: 'Error al obtener turnos' });
    }
    res.json(rows);
  });
};

// GET /api/turnos/count — Contador de turnos
const contarTurnos = (req, res) => {
  const sql = "SELECT COUNT(*) as count FROM turnos";
  db.query(sql, (err, rows) => {
    if (err) {
      console.error('Error obteniendo contador:', err);
      return res.json({ count: 0 });
    }
    res.json({ count: rows[0].count });
  });
};

// GET /api/turnos/:id — Obtener turno por ID
const obtenerTurnoPorId = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM turnos WHERE id = ?";
  
  db.query(sql, [id], (err, rows) => {
    if (err) {
      console.error('Error al obtener turno:', err);
      return res.status(500).json({ error: 'Error al obtener turno' });
    }
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Turno no encontrado' });
    }
    res.json(rows[0]);
  });
};

// POST /api/turnos — Crear nuevo turno
const crearTurno = (req, res) => {
  const { nombres, email, fecha, hora, motivo } = req.body;

  // Validación
  if (!nombres || !email || !fecha || !hora || !motivo) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  console.log('Creando turno:', { nombres, email, fecha, hora, motivo });

  const sql = "INSERT INTO turnos (nombres, email, fecha, hora, motivo) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [nombres, email, fecha, hora, motivo], (err, result) => {
    if (err) {
      console.error('Error al crear turno:', err);
      return res.status(500).json({ error: 'Error al crear turno: ' + err.message });
    }

    console.log('Turno creado exitosamente:', result.insertId);

    // Enviar email de confirmación
    try {
      mailer.enviarConfirmacion(email, nombres, fecha, hora, motivo);
    } catch (emailError) {
      console.warn('Error enviando email (turno creado exitosamente):', emailError.message);
    }

    res.status(201).json({
      message: 'Turno reservado exitosamente',
      id: result.insertId
    });
  });
};

// PUT /api/turnos/:id — Actualizar turno
const actualizarTurno = (req, res) => {
  const { id } = req.params;
  const { nombres, email, fecha, hora, motivo } = req.body;

  if (!nombres || !email || !fecha || !hora || !motivo) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const sql = "UPDATE turnos SET nombres = ?, email = ?, fecha = ?, hora = ?, motivo = ? WHERE id = ?";
  db.query(sql, [nombres, email, fecha, hora, motivo, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar turno:', err);
      return res.status(500).json({ error: 'Error al actualizar turno' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Turno no encontrado' });
    }

    console.log('Turno actualizado exitosamente:', id);

    // Enviar email de confirmación de actualización
    try {
      mailer.enviarConfirmacionActualizacion(email, nombres, fecha, hora, motivo);
    } catch (emailError) {
      console.warn('Error enviando email:', emailError.message);
    }

    res.json({ message: 'Turno actualizado exitosamente' });
  });
};

// DELETE /api/turnos/:id — Eliminar turno
const eliminarTurno = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM turnos WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar turno:', err);
      return res.status(500).json({ error: 'Error al eliminar turno' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Turno no encontrado' });
    }

    res.json({ message: 'Turno eliminado exitosamente' });
  });
};

module.exports = {
  obtenerTurnos,
  contarTurnos,
  obtenerTurnoPorId,
  crearTurno,
  actualizarTurno,
  eliminarTurno
};