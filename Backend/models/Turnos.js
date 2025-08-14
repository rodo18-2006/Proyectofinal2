const mongoose = require("mongoose");

const TurnoSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  nombreUsuario: { type: String, required: true }, // 👈 para guardar el nombre
  clase: { type: String, required: true },
  entrenador: { type: String, required: true },
  fecha: { type: String, required: true },
  horario: { type: String, required: true }
});

module.exports = mongoose.model("Turno", TurnoSchema);
