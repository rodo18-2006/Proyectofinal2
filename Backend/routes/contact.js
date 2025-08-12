const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");



const Contact = require("../models/Contact");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_APP_USER,
    pass: process.env.GMAIL_APP_PASS,
  },
});


require("dotenv").config();

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
    const { respuesta } = req.body;

    // Busca el mensaje original
    const mensaje = await Contact.findById(id);
    if (!mensaje) {
      return res.status(404).json({ error: "Mensaje no encontrado" });
    }

    // Actualiza el mensaje como respondido y guarda la respuesta
    mensaje.respondido = true;
    mensaje.respuesta = respuesta;
    await mensaje.save();

    // Prepara el mail para el usuario que envió la consulta
    const mailOptions = {
      from: process.env.GMAIL_APP_USER,
      to: mensaje.email, // email original que envió la consulta
      subject: `Respuesta a tu consulta: ${mensaje.subject || "Consulta"}`,
      text: `Hola ${mensaje.name},\n\nHas recibido una respuesta a tu consulta:\n\n"${respuesta}"\n\nGracias por contactarnos.`,
    };

    // Envía el mail
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Respuesta enviada y mail enviado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar y enviar mail" });
  }
});



module.exports = router;
