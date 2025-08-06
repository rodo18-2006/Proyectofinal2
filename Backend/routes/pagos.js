const express = require("express");
  const router = express.Router();
  const Pago = require("../models/Pagos");

  // Crear nuevo pago



 router.post("/pagos", async (req, res) => {
   try {
     const { usuario, nombrePlan, monto } = req.body;
     if (!usuario || !nombrePlan || !monto) {
       return res.status(400).json({ error: "Faltan datos requeridos" });
     }
     const nuevoPago = new Pago(req.body);
     await nuevoPago.save();
     res.status(201).json(nuevoPago);
   } catch (error) {
     console.error("Error al guardar el pago:", error);
     res.status(500).json({ error: "Error al guardar el pago" });
   }
 });


  // Obtener todos los pagos
  router.get("/", async (req, res) => {
    try {
      const pagos = await Pago.find().sort({ fechaPago: -1 });
      res.json(pagos);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener pagos" });
    }
  });


  module.exports = router;