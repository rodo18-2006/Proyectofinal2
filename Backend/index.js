const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => console.error("❌ Error al conectar a MongoDB Atlas:", err));

// Rutas existentes
const userRoutes = require("./routes/usuarios");
app.use("/api/usuarios", userRoutes);

const commentRoutes = require("./routes/comment");
app.use("/api/comment", commentRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

const turnosRouter = require("./routes/turnos");
app.use("/api/turnos", turnosRouter);

const contactRoutes = require("./routes/contact");
app.use("/api/contact", contactRoutes);


// ✅ Ruta de pagos (solo una vez)
const pagosRoutes = require("./routes/pagos");
app.use("/api/pagados", pagosRoutes);


// Ruta simple de prueba
app.get("/", (req, res) => {
  res.send("💪 Backend del gimnasio funcionando!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});