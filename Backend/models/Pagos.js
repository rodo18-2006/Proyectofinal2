const mongoose = require("mongoose");

const pagoSchema = new mongoose.Schema({
  usuario: { type: String, required: true },
  nombrePlan: { type: String, required: true },
  monto: { type: Number, required: true },
  fechaPago: { type: Date, default: Date.now },
});


const planSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  precio: { type: Number, required: true },
  beneficios: [String],
});

module.exports = mongoose.model("Pago", pagoSchema);




