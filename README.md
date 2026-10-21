# 📅 Sistema de Gestión de Turnos

Un sistema web completo para la gestión de turnos y citas desarrollado con Node.js, Express y MySQL.

## 🚀 Características

- ✅ **Reserva de turnos** con formulario intuitivo
- 📋 **Lista de turnos** con vista completa
- ✏️ **Edición y eliminación** de turnos
- 📧 **Confirmación por email** automática
- 📱 **Diseño responsive** con Bootstrap 5
- ⚡ **Interfaz moderna** y fácil de usar

## 🛠️ Tecnologías Utilizadas

- **Backend**: Node.js, Express.js
- **Base de datos**: MySQL
- **Frontend**: Handlebars, Bootstrap 5, Font Awesome
- **Email**: Nodemailer
- **Otros**: Body-parser, Express-handlebars

## 📊 Estructura de la Base de Datos

La tabla `turnos` contiene los siguientes campos:

```sql
CREATE TABLE turnos (
  id int NOT NULL AUTO_INCREMENT,
  nombres varchar(120) NOT NULL,
  email varchar(150) NOT NULL,
  fecha date NOT NULL,
  hora time(6) NOT NULL,
  motivo text NOT NULL,
  PRIMARY KEY (id)
);
```

### Campos:

- **id**: Identificador único auto-incremental
- **nombres**: Nombre completo del paciente/cliente
- **email**: Correo electrónico de contacto
- **fecha**: Fecha del turno
- **hora**: Hora del turno
- **motivo**: Motivo o tipo de consulta

### Prerequisitos

- Node.js (v14 o superior)
- MySQL Server
- WAMP/XAMPP 
### Páginas Principales (secciones)

- **Inicio** (`/`): Página de bienvenida
- **Lista de Turnos** (`/turnos`): Ver todos los turnos registrados
- **Reservar Turno** (`/turnos/reservar`): Formulario para nuevo turno
- **Editar Turno** (`/turnos/editar/:id`): Modificar turno existente
- **Contacto** (`/contacto`): Formulario de contacto

### Funcionalidades

1. **Reservar un turno**:

   - Completa el formulario con nombre, email, fecha, hora y motivo
   - El sistema enviará una confirmación por email
   - Redirección automática a la lista de turnos

2. **Ver turnos**:

   - Lista completa con todos los turnos ordenados por fecha
   - Opciones para editar o eliminar cada turno

3. **Editar turno**:

   - Modificar cualquier campo del turno
   - Validación de datos en tiempo real

4. **Eliminar turno**:
   - Confirmación antes de eliminar
   - Eliminación segura de la base de datos

```

## 📁 Estructura del Proyecto

```

📦 Final/
├── 📂 config/
│   └── 📄 database.js          # Configuración de MySQL
│
├── 📂 controllers/
│   └── 📄 turnosController.js  # Lógica de control de turnos
│
├── 📂 routes/
│   ├── 📄 turnos.js           # Rutas de gestión de turnos
│   └── 📄 contacto.js         # Rutas de contacto
│
├── 📂 utils/
│   └── 📄 mailer.js           # Configuración de envío de emails
│
├── 📂 views/
│   ├── 📂 layouts/
│   │   └── 📄 main.handlebars  # Plantilla base
│   ├── 📄 home.handlebars      # Página de inicio
│   ├── 📄 turnos.handlebars    # Lista de turnos
│   ├── 📄 reservar.handlebars  # Formulario de reserva
│   ├── 📄 editar.handlebars    # Formulario de edición
│   ├── 📄 contacto.handlebars  # Formulario de contacto
│   └── 📄 error.handlebars     # Página de error
│
├── 📂 public/
│   ├── 📂 js/
│   │   └── 📄 react-components.js  # Componentes React
│   ├── 📄 styles.css              # Estilos principales
│   └── 📄 styles-form.css         # Estilos de formularios
│
├── 📂 src/                      # Carpeta para futura migración a React
│   ├── 📂 components/
│   └── 📂 pages/
│
├── 📄 app.js                    # Punto de entrada de la aplicación
├── 📄 verificar_db.js           # Script de verificación de base de datos
├── 📄 package.json              # Dependencias del proyecto
├── 📄 package-lock.json         # Lock file de dependencias
├── 📄 gestion_turnos.sql        # Script de la base de datos
└── 📄 README.md                 # Documentación del proyecto
```
```

## 📋 Descripción de Carpetas

### Backend
- **config/**: Configuraciones del servidor y base de datos
- **controllers/**: Lógica de negocio y control de datos
- **routes/**: Definición de rutas y endpoints
- **utils/**: Utilidades y helpers (email, etc.)

### Frontend
- **views/**: Vistas renderizadas con Handlebars
- **public/**: Archivos estáticos (CSS, JS, imágenes)
- **src/**: Preparado para futura migración a React

### Archivos Principales
- **app.js**: Configuración del servidor Express
- **verificar_db.js**: Script de verificación de la base de datos
- **package.json**: Dependencias y scripts del proyecto
- **gestion_turnos.sql**: Estructura y datos de la base de datos

## 🛠 Tecnologías Actuales

### Frontend
- Handlebars (Motor de plantillas)
- Bootstrap (Framework CSS)
- React (Integrado vía CDN)
- SweetAlert2 (Notificaciones)

### Backend
- Node.js
- Express
- MySQL
- Nodemailer


```


