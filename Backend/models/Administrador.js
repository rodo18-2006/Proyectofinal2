  const mongoose = require("mongoose");

  const administradorSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    usuario: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true }, // <-- contraseña
    telefono: { type: String },
    direccion: { type: String },
    rol: { type: String },
    creado: { type: Date, default: Date.now },
    ultimaSesion: { type: Date, default: Date.now },
    sesiones: { type: Number, default: 0 },
    foto: { type: String },
  });


  module.exports = mongoose.model("Administrador", administradorSchema);
