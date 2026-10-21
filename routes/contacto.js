const express = require('express');
const router = express.Router();
const { enviarContacto } = require('../utils/mailer');

// Mostrar formulario de contacto
router.get('/', (req, res) => {
  res.render('contacto', { title: 'Contacto' });
});

// Procesar formulario de contacto
router.post('/', async (req, res) => {
  const { nombre, email, mensaje } = req.body;
  
  try {
    // Enviar email de contacto
    await enviarContacto(nombre, email, mensaje);
    
    console.log('Mensaje de contacto enviado exitosamente:');
    console.log('Nombre:', nombre);
    console.log('Email:', email);
    console.log('Mensaje:', mensaje);
    
    res.render('contacto', { 
      title: 'Contacto',
      mensaje: 'Mensaje enviado correctamente. Te contactaremos pronto.',
      tipo: 'success'
    });
  } catch (error) {
    console.error('Error enviando email de contacto:', error);
    res.render('contacto', { 
      title: 'Contacto',
      mensaje: 'Error al enviar el mensaje. Intenta nuevamente.',
      tipo: 'error'
    });
  }
});

module.exports = router; 