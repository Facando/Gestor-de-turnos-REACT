const express = require('express');
const router = express.Router();
const turnosController = require('../controllers/turnosController');

// RESTful API routes
router.get('/count', turnosController.contarTurnos);
router.get('/', turnosController.obtenerTurnos);
router.get('/:id', turnosController.obtenerTurnoPorId);
router.post('/', turnosController.crearTurno);
router.put('/:id', turnosController.actualizarTurno);
router.delete('/:id', turnosController.eliminarTurno);

module.exports = router;
