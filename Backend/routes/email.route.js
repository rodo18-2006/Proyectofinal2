const express = require("express");
const router = express.Router();
const { registroExitoso, recuperarContrasenia } = require("./nodemailer.middlewares");

router.post("/registro", async (req, res) => {
  const { email, nombre } = req.body;
  const resultado = await registroExitoso(email, nombre);
  res.status(resultado.statusCode).json(resultado);
});

router.post("/recuperar", async (req, res) => {
  const { email, token } = req.body;
  const resultado = await recuperarContrasenia(token, email);
  res.status(resultado.statusCode).json(resultado);
});

module.exports = router;