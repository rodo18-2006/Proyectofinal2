// routes/administrador.js
const express = require("express");
const router = express.Router();
const Admin = require("../models/Administrador");

// Lista de admins locales
const adminsLocales = [
  { usuario: "Rodolfo", contrasena: "rodo123" },
  { usuario: "Sofia", contrasena: "sofia123" },
  { usuario: "Celeste", contrasena: "cele123" },
  { usuario: "Ignacio", contrasena: "nacho123" },
  { usuario: "Mateo", contrasena: "mateo123" },
];

router.post("/", async (req, res) => {
  try {
    const { usuario, contrasena, nombre, email, telefono, direccion, rol } =
      req.body;

    if (!usuario || !contrasena || !nombre || !email)
      return res.status(400).json({ error: "Faltan datos" });

    const adminExistente = await Admin.findOne({ usuario });
    if (adminExistente)
      return res.status(400).json({ error: "Usuario ya existe" });

   const admin = new Admin({
     usuario,
     password: contrasena, // ⚡ Aquí debe coincidir con el esquema
     nombre,
     email,
     telefono,
     direccion,
     rol,
   });

    await admin.save();
    res.status(201).json(admin);
  } catch (error) {
    console.error("Error al crear admin:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});


// Login admin
router.post("/login", async (req, res) => {
  try {
    const { usuario, password } = req.body; // ⚡ Cambiado a password
    if (!usuario || !password)
      return res.status(400).json({ error: "Faltan datos" });

    const admin = await Admin.findOne({ usuario, password }); // ⚡ Cambiado a password
    if (!admin)
      return res
        .status(401)
        .json({ error: "Usuario o contraseña incorrectos" });

    res.json(admin);
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error en el login" });
  }
});


// Obtener todos los admins
router.get("/", async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener administradores" });
  }
});

// Eliminar admin por ID
router.delete("/:id", async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin)
      return res.status(404).json({ error: "Administrador no encontrado" });
    res.json({ message: "Administrador eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar administrador" });
  }
});

module.exports = router;
