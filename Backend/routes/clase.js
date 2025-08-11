const express = require("express");
const router = express.Router();
const Clase = require("../models/Clase");

router.get("/", async (req, res) => {
  try {
    const clases = await Clase.find();
    res.json(clases);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las clases" });
  }
});

router.post("/", async (req, res) => {
  try {
    // En el body puede venir 'fecha', si no, toma la actual
    const nuevaClase = new Clase({
      nombre: req.body.nombre,
      entrenador: req.body.entrenador,
      especialidad: req.body.especialidad,
      experiencia: req.body.experiencia,
      horario: req.body.horario,
      fecha: req.body.fecha || new Date(),
    });


  
    const savedClase = await nuevaClase.save();
    res.status(201).json(savedClase);
  } catch (error) {
    res.status(400).json({ error: "Error al crear la clase" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const claseEditada = await Clase.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!claseEditada)
      return res.status(404).json({ error: "Clase no encontrada" });
    res.json(claseEditada);
  } catch (error) {
    res.status(400).json({ error: "Error al editar la clase" });
  }
});

// DELETE /api/clases/:id
router.delete("/:id", async (req, res) => {
  try {
    const claseEliminada = await Clase.findByIdAndDelete(req.params.id);
    if (!claseEliminada) {
      return res.status(404).json({ message: "Clase no encontrada" });
    }
    res.json({ message: "Clase eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
