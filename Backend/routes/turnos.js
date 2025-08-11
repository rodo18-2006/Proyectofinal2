const express = require("express");
const router = express.Router();
const Turno = require("../models/Turnos");
const Clase = require("../models/Clase"); // Importar modelo Clase para actualizar inscriptos

// POST /api/turnos/reservar
router.post("/reservar", async (req, res) => {
  try {
    const { usuarioId, clase, entrenador, fecha, horario } = req.body;

    if (!usuarioId || !clase || !entrenador || !fecha || !horario) {
      return res
        .status(400)
        .json({ mensaje: "Todos los campos son obligatorios" });
    }

    const [hora, minutos] = horario.split(":");
    const fechaHora = new Date(`${fecha}T${hora}:${minutos}`);
    const ahora = new Date();

    if (fechaHora < ahora) {
      return res
        .status(400)
        .json({ mensaje: "No puedes reservar en el pasado" });
    }

    if (parseInt(hora) < 8 || parseInt(hora) >= 22) {
      return res
        .status(400)
        .json({ mensaje: "El horario debe estar entre las 08:00 y 21:59" });
    }

    // Comprobar si ya hay una reserva en ese horario con ese entrenador
    const existe = await Turno.findOne({ entrenador, fecha, horario });
    if (existe) {
      return res.status(400).json({
        mensaje: "Ya hay una clase reservada con ese entrenador a esa hora",
      });
    }

    // Crear y guardar el turno
    const nuevoTurno = new Turno({
      usuarioId,
      clase,
      entrenador,
      fecha,
      horario,
    });
    await nuevoTurno.save();

    // Incrementar inscriptos en la clase correspondiente
    await Clase.findOneAndUpdate(
      { nombre: clase },
      { $inc: { inscriptos: 1 } }
    );

    res.json({ mensaje: "Clase reservada con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error del servidor" });
  }
});

// GET /api/turnos - Obtener todos los turnos
router.get("/", async (req, res) => {
  try {
    const turnos = await Turno.find();
    res.json(turnos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener los turnos" });
  }
});

// DELETE /api/turnos/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const turno = await Turno.findById(id);
    if (!turno) {
      return res.status(404).json({ mensaje: "Turno no encontrado" });
    }

    // Disminuir inscriptos en la clase correspondiente
    await Clase.findOneAndUpdate(
      { nombre: turno.clase },
      { $inc: { inscriptos: -1 } }
    );

    await Turno.findByIdAndDelete(id);
    res.json({ mensaje: "Turno eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error del servidor" });
  }
});

module.exports = router;
