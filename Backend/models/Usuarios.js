const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String },
  telefono: { type: String },
  dni: { type: String },
  email: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  plan: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Usuario", UsuarioSchema);
