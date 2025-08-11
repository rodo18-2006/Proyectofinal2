/* const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.CORREO_GMAIL,
    pass: process.env.PASS_APP_GMAIL,
  },
});

const enviarCorreoBienvenida = async (email, nombre) => { 
  try {
    await transporter.sendMail({
      from: `"FitGym 💪" <${process.env.CORREO_GMAIL}>`,
      to: email,
      subject: "¡Bienvenido/a a FitGym!",
      html: `<h2>Hola ${nombre}!</h2>
      <p>Gracias por registrarte en FitGym. ¡Estamos felices de tenerte con nosotros!</p>
      <p>💪 Tu salud y bienestar son nuestra prioridad.</p>`,
    });
    console.log("Correo de bienvenida enviado a:", email);
  } catch (error) {
    console.error("Error al enviar el correo de bienvenida:", error);
  }
};

const enviarCorreoRecuperacion = async (email, nuevaContraseña) => {
  try {
    await transporter.sendMail({
      from: `"FitGym 💪" <${process.env.CORREO_GMAIL}>`,
      to: email,
      subject: "Recuperación de Contraseña",
      html: `<h2>Hola,</h2><p>Tu nueva contraseña temporal es: <b>${nuevaContraseña}</b><br>Te recomendamos cambiarla después de iniciar sesión.</p>`,
    });
    console.log("Correo de recuperación enviado a", email);
  } catch (error) {
    console.error("Error al enviar correo de recuperación:", error);
  }
};

module.exports = {
  enviarCorreoBienvenida,
  enviarCorreoRecuperacion,
};


 */

/* const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: `${process.env.GMAIL_APP_USER}`,
    pass: `${process.env.GMAIL_APP_PASS}`,
  },
});


 module.exports = transporter */
const nodemailer = require("nodemailer");

// Configura tu transporter (ejemplo con Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.GMAIL_APP_USER}`, 
    pass: `${process.env.GMAIL_APP_PASS}`, 
  },
});

async function enviarCorreoBienvenida(email, nombre) {
  const mailOptions = {
    from: '"FitGym" <tucorreo@gmail.com>',
    to: email,
    subject: "¡Bienvenido a FitGym!",
    html: `
      <h1>Hola ${nombre} 👋</h1>
      <p>Gracias por registrarte en FitGym. ¡Estamos felices de que te unas a nuestra comunidad!</p>
      <p>Prepárate para alcanzar tus metas con nosotros.</p>
      <hr />
      <p>FitGym - Tu gimnasio online</p>
    `,
  };

  return transporter.sendMail(mailOptions);
}

async function enviarCorreoRecuperacion(email, nombre, enlace) {
  const mailOptions = {
    from: '"FitGym" <tucorreo@gmail.com>',
    to: email,
    subject: "Recuperación de contraseña FitGym",
    html: `
      <h1>Hola ${nombre}</h1>
      <p>Recibimos una solicitud para restablecer tu contraseña.</p>
      <p>Hacé clic en el siguiente enlace para elegir una nueva contraseña:</p>
      <a href="${enlace}">Cambiar mi contraseña</a>
      <p>Si no solicitaste esto, ignorá este correo.</p>
      <hr />
      <p>FitGym - Tu gimnasio online</p>
    `,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { enviarCorreoBienvenida, enviarCorreoRecuperacion };
