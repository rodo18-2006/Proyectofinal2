import nodemailer from "nodemailer";

// Configuración del transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.CORREO_GMAIL,
    pass: process.env.PASS_APP_GMAIL,
  },
});

// Enviar correo de bienvenida
export const enviarCorreoBienvenida = async (email, nombre) => {
  try {
    await transporter.sendMail({
      from: `"FitGym 💪" <${process.env.CORREO_GMAIL}>`,
      to: email,
      subject: "¡Bienvenido a FitGym!",
      html: `<p>Hola ${nombre},</p><p>¡Gracias por registrarte en FitGym! 💪</p><p>Ya podés disfrutar de nuestros servicios.</p>`,
    });
  } catch (error) {
    console.error("Error al enviar correo de bienvenida:", error);
  }
};

// Enviar correo de recuperación de contraseña
export const enviarCorreoRecuperacion = async (email, nuevaContraseña) => {
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
