const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Inicializar base de datos
const db = require('./config/database');

// Importar rutas
const turnosRoutes = require('./routes/turnos');
const contactoRoutes = require('./routes/contacto');

// Configuración de Handlebars
const hbs = exphbs.create({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  helpers: {
    eq: function(a, b) {
      return a === b;
    },
    ne: function(a, b) {
      return a !== b;
    },
    gt: function(a, b) {
      return a > b;
    },
    lt: function(a, b) {
      return a < b;
    },
    and: function(a, b) {
      return a && b;
    },
    or: function(a, b) {
      return a || b;
    },
    formatDate: function(date) {
      if (!date) return '';
      const d = new Date(date);
      const day = d.getDate().toString().padStart(2, '0');
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    },
    formatTime: function(time) {
      if (!time) return '';
      
      return time.substring(0, 5);
    }
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas principales
app.get('/', (req, res) => {
    res.render('home', {
        title: 'Gestión de Turnos',
        mensaje: '¡Bienvenido al sistema de gestión de turnos!'
    });
});

// API Routes para React (mantener para el contador)
app.get('/api/turnos/count', (req, res) => {
    const sql = "SELECT COUNT(*) as count FROM turnos";
    db.query(sql, (err, rows) => {
        if (err) {
            console.error('Error obteniendo contador:', err);
            return res.json({ count: 0 });
        }
        console.log('Resultado SQL:', rows); // 
        res.json({ count: rows[0].count });
    });
});

// Usar rutas
app.use('/turnos', turnosRoutes);
app.use('/contacto', contactoRoutes);

// Ruta para reservar (alias)
app.get('/reservar', (req, res) => {
    res.redirect('/turnos/reservar');
});

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).render('error', {
        title: 'Página no encontrada',
        error: 'La página que buscas no existe'
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(` Servidor corriendo en http://localhost:${PORT}`);
    console.log(` Base de datos: SQL`);
    console.log(` Nodemailer configurado`);
    console.log(` React.js integrado via CDN`);
}); 