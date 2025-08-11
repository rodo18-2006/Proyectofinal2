const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuarios");
const bcrypt = require("bcrypt");
const crypto = require("crypto"); // <--- SOLO UNA VEZ
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");


const {
  enviarCorreoBienvenida,
  enviarCorreoRecuperacion,
} = require("../utils/mailer");

const JWT_SECRET = process.env.JWT_SECRET || "tu_secreto_aqui";

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

// Registro
router.post("/registro", async (req, res) => {
  try {
    const { nombre, email, contraseña } = req.body;

    if (!nombre || !email || !contraseña) {
      return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
    }

    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(400).json({ mensaje: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const nuevoUsuario = new Usuario({
      nombre,
      email,
      contraseña: hashedPassword,
    });

    await nuevoUsuario.save();

    await enviarCorreoBienvenida(email, nombre);

    res.status(201).json({ mensaje: "Usuario creado correctamente" });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ mensaje: "Error al registrar el usuario" });
  }
});

// Login con JWT
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

    const isMatch = await bcrypt.compare(password, user.contraseña);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Crear token JWT con datos mínimos que necesites en el cliente
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        rol: user.rol,
      },
      JWT_SECRET,
      { expiresIn: "12h" }
    );

    // Respuesta con token y datos del usuario (sin contraseña)
    res.json({
      mensaje: "Login exitoso",
      token,
      usuario: {
        id: user._id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
        // Agrega otros campos aquí si los tienes en el modelo y quieres enviar
      },
    });
  } catch (error) {
    console.error("Error en /login:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Recuperar contraseña


// En tu router
router.post("/recuperar", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).json({ mensaje: "El email es requerido" });

    const usuario = await Usuario.findOne({ email });
    if (!usuario)
      return res.status(404).json({ mensaje: "Usuario no encontrado" });

    // Generar token seguro
    const token = crypto.randomBytes(32).toString("hex");

    // Guardar token y expiración (1 hora)
    usuario.tokenRecuperacion = token;
    usuario.tokenExpira = Date.now() + 3600000; // 1 hora
    await usuario.save();

    // Construir enlace con token
    const enlace = `http://localhost:5173/reset-password?token=${token}`;


    // Enviar correo con enlace
    await enviarCorreoRecuperacion(usuario.email, usuario.nombre, enlace);

    res
      .status(200)
      .json({ mensaje: "Se envió un correo con el enlace de recuperación" });
  } catch (error) {
    console.error("Error en /recuperar:", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
});



router.post("/reset-password", async (req, res) => {
  try {
    const { token, nuevaContraseña } = req.body;

    if (!token || !nuevaContraseña) {
      return res.status(400).json({ mensaje: "Faltan datos" });
    }

    const usuario = await Usuario.findOne({
      tokenRecuperacion: token,
      tokenExpira: { $gt: Date.now() },
    });

    if (!usuario) {
      return res.status(400).json({ mensaje: "Token inválido o expirado" });
    }

    // Hashear nueva contraseña y guardar
    const salt = await bcrypt.genSalt(10);
    usuario.contraseña = await bcrypt.hash(nuevaContraseña, salt);

    // Limpiar token y expiración
    usuario.tokenRecuperacion = undefined;
    usuario.tokenExpira = undefined;

    await usuario.save();

    res.status(200).json({ mensaje: "Contraseña cambiada correctamente" });
  } catch (error) {
    console.error("Error en /reset-password:", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
});

// routes/usuarios.js
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByIdAndDelete(id);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error eliminando usuario:", error);
    res.status(500).json({ mensaje: "Error al eliminar usuario" });
  }
});


module.exports = router;
