const nodemailer = require("nodemailer");

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
