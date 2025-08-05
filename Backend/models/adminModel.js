const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  nombre: String,
  usuario: String,
  email: String,
  telefono: String,
  direccion: String,
  contrasena: String,
  rol: { type: String, default: "admin" },
  creado: { type: Date, default: Date.now },
  ultimaSesion: { type: Date },
});

module.exports = mongoose.model("Admin", adminSchema);
