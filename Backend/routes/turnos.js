const express = require("express");
const router = express.Router();
const Turno = require("../models/Turnos");

// Obtener todos los turnos (opcional para administración o historial)
router.get("/", async (req, res) => {
  try {
    const turnos = await Turno.find().populate("usuarioId", "nombre email");
    res.json(turnos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener turnos" });
  }
});

// Reservar turno
router.post("/reservar", async (req, res) => {
  try {
    const { usuarioId, clase, entrenador, fecha, horario } = req.body;

    // Validar campos
    if (!usuarioId || !clase || !entrenador || !fecha || !horario) {
      return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
    }

    
    const ahora = new Date();
    const fechaHoraSeleccionada = new Date(`${fecha}T${horario}:00`);
    if (fechaHoraSeleccionada < ahora) {
      return res
        .status(400)
        .json({ mensaje: "No se puede reservar un turno pasado" });
    }

    const LIMITE_CUPOS = 10;

    // Contar reservas existentes para esa clase, fecha y horario
    const reservasExistentes = await Turno.countDocuments({
      clase,
      fecha,
      horario,
    });

    if (reservasExistentes >= LIMITE_CUPOS) {
      return res
        .status(400)
        .json({ mensaje: "No quedan cupos disponibles para ese horario" });
    }

    // Crear reserva
    const nuevoTurno = new Turno({
      usuarioId,
      clase,
      entrenador,
      fecha,
      horario,
    });

    await nuevoTurno.save();

    res
      .status(201)
      .json({ mensaje: "Turno reservado con éxito", turno: nuevoTurno });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
});

module.exports = router;
