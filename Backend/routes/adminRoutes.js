const express = require("express");
const router = express.Router();
const Admin = require("../models/adminModel");

// Obtener todos los administradores
router.get("/", async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear nuevo admin
router.post("/", async (req, res) => {
  const nuevoAdmin = new Admin(req.body);
  try {
    const guardado = await nuevoAdmin.save();
    res.status(201).json(guardado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Actualizar info del admin
router.put("/:id", async (req, res) => {
  try {
    const actualizado = await Admin.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
