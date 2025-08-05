const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

// POST - enviar mensaje
router.post("/", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ message: "Mensaje enviado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al enviar el mensaje" });
  }
});

// GET - obtener mensajes
router.get("/", async (req, res) => {
  try {
    const mensajes = await Contact.find();
    res.json(mensajes);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los mensajes" });
  }
});

// PATCH - marcar mensaje como respondido
router.patch("/:id/respond", async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndUpdate(id, { respondido: true });
    res.json({ message: "Mensaje marcado como respondido" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar mensaje" });
  }
});

module.exports = router;
