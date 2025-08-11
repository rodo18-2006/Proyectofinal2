
const express = require("express");
const router = express.Router();
const Pago = require("../models/Pagos");

// Importar fetch de node-fetch de manera compatible con CommonJS
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

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

router.get("/", async (req, res) => {
  try {
    const pagos = await Pago.find().sort({ fechaPago: -1 });
    res.json(pagos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener pagos" });
  }
});

router.post("/crear-preferencia", async (req, res) => {
  try {
    const preferenceData = req.body;


    const response = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ACCESS_TOKEN_MP},
        `},
        body: JSON.stringify(preferenceData),
      }
    );

    const data = await response.json();

    if (!data.init_point) {
      return res.status(400).json({ error: "No se recibió init_point" });
    }

   res.json(data);
  } catch (error) {
    console.error("Error creando preferencia Mercado Pago:", error);
    res.status(500).json({ error: "Error creando preferencia Mercado Pago" });
  }
});

module.exports = router;
