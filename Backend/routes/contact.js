const express = require("express");
const router = express.Router();

const Contact = require("../models/Contact");


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
router.get("/contact", async (req, res) => {
  try {
    const mensajes = await Contact.find({ respondido: false });
    res.json(mensajes);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los mensajes" });
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

router.patch("/contact/:id/respond", async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndUpdate(id, { respondido: true });
    res.status(200).json({ message: "Marcado como respondido" });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar estado" });
  }
});


module.exports = router;
