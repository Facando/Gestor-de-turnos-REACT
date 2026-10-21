const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Inicializar base de datos
const db = require('./config/database');

// Importar rutas API
const turnosRoutes = require('./routes/turnos');
const contactoRoutes = require('./routes/contacto');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS para desarrollo (Vite corre en :5173)
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
  });
}

// API Routes
app.use('/api/turnos', turnosRoutes);
app.use('/api/contacto', contactoRoutes);

// En producción, servir el build de React
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  
  // Cualquier ruta no-API sirve el index.html de React (SPA)
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ API corriendo en http://localhost:${PORT}`);
  console.log(`📊 Base de datos: MySQL`);
  console.log(`📧 Nodemailer configurado`);
  if (process.env.NODE_ENV !== 'production') {
    console.log(`🔗 Frontend dev: http://localhost:5173`);
  }
});