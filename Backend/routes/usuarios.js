const express = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");

const router = express.Router();

// Registro
router.post("/registrar", async (req, res) => {
  try {
    const { nombre, apellido, telefono, dni, email, contraseña, plan } = req.body;

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: "El email ya está registrado" });
    }

    const hashedPass = await bcrypt.hash(contraseña, 10);

    const nuevoUsuario = new Usuario({
      nombre,
      apellido,
      telefono,
      dni,
      email,
      contraseña: hashedPass,
      plan,
    });

    await nuevoUsuario.save();

    res.status(201).json({ mensaje: "Usuario registrado con éxito" });
  } catch (err) {
    res.status(500).json({ mensaje: "Error del servidor" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (!usuario) return res.status(400).json({ mensaje: "Usuario no encontrado" });

    const passwordValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!passwordValida) return res.status(400).json({ mensaje: "Contraseña incorrecta" });

    res.json({ mensaje: "Login exitoso", usuario });
  } catch (err) {
    res.status(500).json({ mensaje: "Error del servidor" });
  }
});

// Recuperar contraseña (simulada)
router.post("/recuperar", async (req, res) => {
  const { email } = req.body;
  const usuario = await Usuario.findOne({ email });

  if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });

  // Aquí normalmente se enviaría un email de recuperación.
  // Por simplicidad, se responde directamente:
  res.json({ mensaje: "Instrucciones de recuperación enviadas al correo" });
});

module.exports = router;