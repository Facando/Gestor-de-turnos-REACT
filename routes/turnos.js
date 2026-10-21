const express = require('express');
const router = express.Router();
const turnosController = require('../controllers/turnosController');

// Rutas para turnos
router.get('/', turnosController.obtenerTurnos);
router.get('/reservar', turnosController.mostrarFormularioCrear);
router.post('/reservar', turnosController.crearTurno);
router.get('/editar/:id', turnosController.mostrarFormularioEditar);
router.post('/editar/:id', turnosController.actualizarTurno);
router.post('/eliminar/:id', turnosController.eliminarTurno);

module.exports = router; 

