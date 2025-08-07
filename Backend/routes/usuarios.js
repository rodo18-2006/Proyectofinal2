const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuarios");
const {
  enviarCorreoBienvenida,
  enviarCorreoRecuperacion,
} = require("../utils/mailer");
const bcrypt = require("bcrypt");
const crypto = require("crypto");



// Obtener todos los usuarios sin la contraseña
router.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.find({}, "-contraseña"); // Excluye la contraseña
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener usuarios" });
  }
});

// Registro de usuario
router.post("/registrar", async (req, res) => {
  try {
    const { nombre, email, contraseña } = req.body;

    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(400).json({ mensaje: "El usuario ya existe" });
    }

    const rol = email === "admin@fitgym.com" ? "admin" : "usuario";

    // Hashear la contraseña antes de guardar
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contraseña, salt);

    const nuevoUsuario = new Usuario({
      nombre,
      email,
      contraseña: hashedPassword,
      rol,
    });
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

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Faltan email o contraseña" });
    }

    const user = await Usuario.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    console.log("Contraseña almacenada:", user.contraseña);

    // Opcional: chequeo rápido si parece hash bcrypt
    const esHash = user.contraseña.startsWith("$2");
    console.log("¿Es hash bcrypt?", esHash);

    const isMatch = await bcrypt.compare(password, user.contraseña);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Login correcto
    const usuarioResponse = {
      id: user._id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
    };

    res.json({ mensaje: "Login exitoso", usuario: usuarioResponse });
  } catch (error) {
    console.error("Error en /login:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});




// Ruta para recuperar contraseña
router.post("/recuperar", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).json({ mensaje: "El email es requerido" });

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Generar nueva contraseña aleatoria de 8 caracteres
    const nuevaContraseña = crypto.randomBytes(4).toString("hex");

    // Hashear la nueva contraseña antes de guardar
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(nuevaContraseña, salt);

    usuario.contraseña = hashedPassword;
    await usuario.save();

    // Enviar mail con la nueva contraseña en texto plano (para que el usuario la reciba)
    await enviarCorreoRecuperacion(email, nuevaContraseña);

    res
      .status(200)
      .json({ mensaje: "Se envió un correo con la nueva contraseña" });
  } catch (error) {
    console.error("Error en /recuperar:", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
});

module.exports = router;
