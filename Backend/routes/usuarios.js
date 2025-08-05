const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuarios");
const enviarCorreoBienvenida = require("../utils/mailer"); // importación del mailer
const crypto = require("crypto");

// Registro de usuario
router.post("/registrar", async (req, res) => {
  try {
    const { nombre, email, contraseña } = req.body;

    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(400).json({ mensaje: "El usuario ya existe" });
    }

    const rol = email === "admin@fitgym.com" ? "admin" : "usuario";

    const nuevoUsuario = new Usuario({ nombre, email, contraseña, rol });
    await nuevoUsuario.save();

    // Enviar correo de bienvenida
    await enviarCorreoBienvenida(email, nombre);

    const usuarioResponse = {
      id: nuevoUsuario._id,
      nombre: nuevoUsuario.nombre,
      email: nuevoUsuario.email,
      rol: nuevoUsuario.rol,
    };

    res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      usuario: usuarioResponse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
});

// Login de usuario
router.post("/login", async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario || usuario.contraseña !== contraseña) {
      return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }

    const { nombre, email: userEmail, rol, _id } = usuario;

    res.status(200).json({
      mensaje: "Login exitoso",
      usuario: { id: _id, nombre, email: userEmail, rol },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
});

// Obtener todos los usuarios sin contraseña
router.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.find({}, "-contraseña");
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener usuarios" });
  }
});

// Ruta para recuperar contraseña
router.post("/recuperar", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ mensaje: "El email es requerido" });

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Generar nueva contraseña aleatoria de 8 caracteres
    const nuevaContraseña = crypto.randomBytes(4).toString("hex");

    // Actualizar contraseña (idealmente hashearla, aquí simplificado)
    usuario.contraseña = nuevaContraseña;
    await usuario.save();

    // Enviar mail con la nueva contraseña
    await enviarCorreoRecuperacion(email, nuevaContraseña);

    res.status(200).json({ mensaje: "Se envió un correo con la nueva contraseña" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
});


module.exports = router;
