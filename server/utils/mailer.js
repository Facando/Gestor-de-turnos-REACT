const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'afullstack1@gmail.com',
    pass: process.env.EMAIL_PASS || 'umso kugs ggpk zlin'
  }
});

// Función para enviar email de confirmación
const enviarConfirmacion = (email, nombres, fecha, hora, motivo) => {
  const mailOptions = {
    from: process.env.EMAIL_USER || 'afullstack1@gmail.com',
    to: email,
    subject: 'Confirmación de Turno - Gestión de Turnos',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">¡Turno Confirmado!</h2>
        <p>Hola <strong>${nombres}</strong>,</p>
        <p>Tu turno ha sido confirmado exitosamente:</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Motivo:</strong> ${motivo}</p>
          <p><strong>Fecha:</strong> ${fecha}</p>
          <p><strong>Hora:</strong> ${hora}</p>
        </div>
        <p>Por favor, llega 10 minutos antes de tu cita.</p>
        <p>¡Gracias por elegirnos!</p>
        <hr>
        <p style="font-size: 12px; color: #666;">
          Si necesitas cancelar o reprogramar, contacta con nosotros.
        </p>
      </div>
    `
  };


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error enviando email:', error);
    } else {
      console.log('Email enviado:', info.response);
    }
  });
};

// Función para enviar email de confirmación de actualización
const enviarConfirmacionActualizacion = (email, nombres, fecha, hora, motivo) => {
  const mailOptions = {
    from: process.env.EMAIL_USER || 'afullstack1@gmail.com',
    to: email,
    subject: 'Turno Actualizado - Gestión de Turnos',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #28a745;">¡Turno Actualizado!</h2>
        <p>Hola <strong>${nombres}</strong>,</p>
        <p>Tu turno ha sido <strong>actualizado exitosamente</strong>. Aquí están los nuevos detalles:</p>
        <div style="background-color: #e8f5e8; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #28a745;">
          <p><strong>Motivo:</strong> ${motivo}</p>
          <p><strong>Nueva Fecha:</strong> ${fecha}</p>
          <p><strong>Nueva Hora:</strong> ${hora}</p>
        </div>
        <p style="color: #28a745; font-weight: bold;">✅ Cambios confirmados</p>
        <p>Por favor, llega 10 minutos antes de tu nueva cita.</p>
        <p>¡Gracias por elegirnos!</p>
        <hr>
        <p style="font-size: 12px; color: #666;">
          Si necesitas hacer más cambios o cancelar, contacta con nosotros.
        </p>
      </div>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error enviando email de actualización:', error);
    } else {
      console.log('Email de actualización enviado:', info.response);
    }
  });
};


// Función para enviar email desde formulario de contacto
const enviarContacto = (nombres, email, mensaje) => {
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER || 'afullstack1@gmail.com',
    subject: `Mensaje de Contacto - ${nombres}`,
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h3>Nuevo mensaje de contacto</h3>
        <p><strong>Nombre:</strong> ${nombres}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
          ${mensaje}
        </div>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};



module.exports = {
  enviarConfirmacion,
  enviarContacto,
  enviarConfirmacionActualizacion,
  
}; 