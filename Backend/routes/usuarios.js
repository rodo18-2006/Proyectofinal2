const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");

// Registro o login según un campo "accion"
router.post("/", async (req, res) => {
  const { accion, nombre, email, contraseña } = req.body;

  try {
    if (accion === "register") {
      const existe = await Usuario.findOne({ email });
      if (existe)
        return res.status(400).json({ mensaje: "El usuario ya existe" });

      const nuevoUsuario = new Usuario({ nombre, email, contraseña });
      await nuevoUsuario.save();

      return res
        .status(201)
        .json({ mensaje: "Usuario registrado correctamente" });
    }

    if (accion === "login") {
      const usuario = await Usuario.findOne({ email });
      if (!usuario || usuario.contraseña !== contraseña) {
        return res.status(401).json({ mensaje: "Credenciales incorrectas" });
      }
      return res.status(200).json({ mensaje: "Login exitoso", usuario });
    }

    return res.status(400).json({ mensaje: "Acción inválida" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor", error });
  }
});

module.exports = router;
