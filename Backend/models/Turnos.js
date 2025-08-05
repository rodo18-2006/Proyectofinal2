const mongoose = require("mongoose");

const turnoSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  clase: { type: String, required: true },
  entrenador: { type: String, required: true },
  fecha: { type: String, required: true }, // Para simplificar usamos string con formato "YYYY-MM-DD"
  horario: { type: String, required: true }, // Ejemplo: "14:00"
  creadoEn: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Turno", turnoSchema);
