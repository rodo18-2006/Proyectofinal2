// routes/usuarios.js
const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuarios");

router.post("/", async (req, res) => {
  const { accion, nombre, email, contraseña } = req.body;

  try {
    if (accion === "register") {
      const existe = await Usuario.findOne({ email });
      if (existe)
        return res.status(400).json({ mensaje: "El usuario ya existe" });

      const rol = email === "admin@fitgym.com" ? "admin" : "usuario";

      const nuevoUsuario = new Usuario({ nombre, email, contraseña, rol });
      await nuevoUsuario.save();

      const usuarioResponse = {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol,
      };

      return res
        .status(201)
        .json({
          mensaje: "Usuario registrado correctamente",
          usuarioNuevo: usuarioResponse,
        });
    }

    if (accion === "login") {
      const usuario = await Usuario.findOne({ email });
      if (!usuario || usuario.contraseña !== contraseña) {
        return res.status(401).json({ mensaje: "Credenciales incorrectas" });
      }

      const { nombre, email: userEmail, rol, _id } = usuario;

      return res.status(200).json({
        mensaje: "Login exitoso",
        usuario: { id: _id, nombre, email: userEmail, rol },
      });
    }

    return res.status(400).json({ mensaje: "Acción inválida" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
});

// Ruta GET para traer todos los usuarios sin contraseña
router.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.find({}, "-contraseña");
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener usuarios" });
  }
});

module.exports = router;
