const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.CORREO_GMAIL, // usa variables de entorno
    pass: process.env.PASS_APP_GMAIL,
  },
});

const enviarCorreoBienvenida = async (email, nombre) => {
  try {
    await transporter.sendMail({
      from: '"FitGym 💪" <' + process.env.CORREO_GMAIL + ">",
      to: email,
      subject: "¡Bienvenido a FitGym!",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 10px;">
          <h2 style="color:#333;">Hola ${nombre} 👋</h2>
          <p>Gracias por registrarte en <strong>FitGym</strong>. ¡Nos alegra tenerte como parte de nuestra comunidad!</p>
          <p>Prepárate para alcanzar tus objetivos y disfrutar de una vida más activa 💪</p>
          <p style="margin-top: 20px;">¡Nos vemos pronto!</p>
          <hr />
          <small style="color:#888;">Este mensaje fue generado automáticamente.</small>
        </div>
      `,
    });
    console.log("Correo de bienvenida enviado a:", email);
  } catch (error) {
    console.error("Error al enviar correo:", error);
  }
};

const enviarCorreoRecuperacion = async (email, nuevaContraseña) => {
  try {
    await transporter.sendMail({
      from: '"FitGym 💪" <' + process.env.CORREO_GMAIL + ">",
      to: email,
      subject: "Recuperación de contraseña - FitGym",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 10px;">
          <h2 style="color:#333;">Hola 👋</h2>
          <p>Has solicitado recuperar tu contraseña en <strong>FitGym</strong>.</p>
          <p>Tu nueva contraseña es: <strong>${nuevaContraseña}</strong></p>
          <p>Te recomendamos cambiarla una vez que ingreses.</p>
          <hr />
          <small style="color:#888;">Este mensaje fue generado automáticamente.</small>
        </div>
      `,
    });
    console.log("Correo de recuperación enviado a:", email);
  } catch (error) {
    console.error("Error al enviar correo de recuperación:", error);
  }
};

module.exports = { enviarCorreoBienvenida, enviarCorreoRecuperacion };
