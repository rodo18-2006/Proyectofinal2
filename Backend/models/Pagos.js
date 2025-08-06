const mongoose = require("mongoose");

const pagoSchema = new mongoose.Schema({
  usuario: { type: String, required: true }, // puedes asociarlo con un ID si ya tienes usuarios
  nombrePlan: { type: String, required: true },
  monto: { type: Number, required: true },
  fechaPago: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Pago", pagoSchema);
