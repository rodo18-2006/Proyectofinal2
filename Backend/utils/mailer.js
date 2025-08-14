const nodemailer = require("nodemailer");

// Configura tu transporter (ejemplo con Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_APP_USER,
    pass: process.env.GMAIL_APP_PASS,
  },
});

// Correo de bienvenida
async function enviarCorreoBienvenida(email, nombre) {
  const mailOptions = {
    from: '"FitGym 💪" <tucorreo@gmail.com>',
    to: email,
    subject: "¡Bienvenido a FitGym!",
    html: `
      <div style="text-align: center; font-family: Arial, sans-serif;">
        <h1 style="color: #ff6600;">Hola ${nombre} 👋</h1>
        <p>Gracias por registrarte en FitGym. ¡Estamos felices de que te unas a nuestra comunidad!</p>
        <img src="cid:logoFitGym" alt="FitGym Logo" width="200" style="margin: 20px 0;"/>
        <p>Prepárate para alcanzar tus metas con nosotros.</p>
        <hr style="margin: 20px 0;"/>
        <p style="font-size: 0.9em; color: #555;">FitGym - Tu gimnasio online</p>
      </div>
    `,
    attachments: [
      {
        filename: "welcome.png",
        path: "./img/welcome.png", 
        cid: "logoFitGym",
      },
    ],
  };

  return transporter.sendMail(mailOptions);
}

async function enviarCorreoRecuperacion(email, nombre, enlace) {
  const mailOptions = {
    from: '"FitGym 💪" <tucorreo@gmail.com>',
    to: email,
    subject: "Recuperación de contraseña FitGym",
    html: `
      <div style="text-align: center; font-family: Arial, sans-serif;">
        <h1 style="color: #ff6600;">Hola ${nombre}</h1>
        <p>Recibimos una solicitud para restablecer tu contraseña.</p>
        <p>Hacé clic en el siguiente enlace para elegir una nueva contraseña:</p>
        <a href="${enlace}" style="display: inline-block; padding: 10px 20px; background: #ff6600; color: #fff; text-decoration: none; border-radius: 5px;">Cambiar mi contraseña</a>
        <img src="cid:logoFitGym" alt="FitGym Logo" width="200" style="margin: 20px 0;"/>
        <p>Si no solicitaste esto, ignorá este correo.</p>
        <hr style="margin: 20px 0;"/>
        <p style="font-size: 0.9em; color: #555;">FitGym - Tu gimnasio online</p>
      </div>
    `,
    attachments: [
      {
        filename: "welcome.png",
        path: "./img/fitgym.png",
        cid: "logoFitGym",
      },
    ],
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { enviarCorreoBienvenida, enviarCorreoRecuperacion };
