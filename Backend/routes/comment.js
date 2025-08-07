const express = require("express");
const Comment = require("../models/Comment");

const router = express.Router();

// GET todos los comentarios
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 }); // typo corregido aquí
    res.json(comments);
  } catch (error) {
    console.error("Error al obtener comentarios:", error);
    res.status(500).json({ message: "Error al obtener comentarios" });
  }
});

// POST nuevo comentario
router.post("/", async (req, res) => {
  try {
    const { name, comment, rating } = req.body;

    // Validación simple
    if (!name || !comment || rating == null) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    const nuevoComentario = new Comment({ name, comment, rating });
    const savedComment = await nuevoComentario.save();
    res.status(201).json(savedComment);
  } catch (error) {
    console.error("Error al guardar comentario:", error);
    res.status(500).json({ message: "Error al guardar comentario" });
  }
});

module.exports = router;
