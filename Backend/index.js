const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => console.error("❌ Error al conectar a MongoDB Atlas:", err));

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("💪 Backend del gimnasio funcionando!");


  const userRoutes = require("./routes/usuarios");
  app.use("/api/usuarios", userRoutes);

});

// Aquí después se agregan las rutas reales
// app.use('/api/usuarios', require('./routes/userRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
