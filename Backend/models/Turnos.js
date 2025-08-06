const mongoose = require("mongoose");

const turnoSchema = new mongoose.Schema({
  usuarioId: {
    type: String,
    required: true,
  },
  clase: {
    type: String,
    required: true,
  },
  entrenador: {
    type: String,
    required: true,
  },
  fecha: {
    type: String,
    required: true,
  },
  horario: {
    type: String,
    required: true,
  },
  creadoEn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Turno", turnoSchema);
