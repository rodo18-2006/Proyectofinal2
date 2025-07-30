// routes/comments.js
const express = require("express");
const Comment = require("../models/Comment");

const router = express.Router();






// GET todos los comentarios
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener comentarios" });
  }
});

// POST nuevo comentario
router.post("/", async (req, res) => {
  try {
    const { name, comment, rating } = req.body;
    const nuevoComentario = new Comment({ name, comment, rating });
    await nuevoComentario.save();
    res.status(201).json(nuevoComentario);
  } catch (error) {
    res.status(400).json({ message: "Error al guardar comentario" });
  }
});

module.exports = router;
