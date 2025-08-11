const mongoose = require("mongoose");

const claseSchema = new mongoose.Schema({
  nombre: String,
  entrenador: String,
  especialidad: String,
  experiencia: String,
  horario: String,
  fecha: { type: Date, default: Date.now },
  inscriptos: { type: Number, default: 0 }, // campo agregado
});


module.exports = mongoose.model("Clase", claseSchema);
