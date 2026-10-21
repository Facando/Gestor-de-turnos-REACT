const express = require('express');
const router = express.Router();
const { enviarContacto } = require('../utils/mailer');

// POST /api/contacto — Enviar mensaje de contacto
router.post('/', async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    await enviarContacto(nombre, email, mensaje);

    console.log('Mensaje de contacto enviado exitosamente:');
    console.log('Nombre:', nombre);
    console.log('Email:', email);

    res.json({ message: 'Mensaje enviado correctamente. Te contactaremos pronto.' });
  } catch (error) {
    console.error('Error enviando email de contacto:', error);
    res.status(500).json({ error: 'Error al enviar el mensaje. Intenta nuevamente.' });
  }
});

module.exports = router;