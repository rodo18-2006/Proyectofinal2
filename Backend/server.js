import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch((err) => console.log('Error al conectar con MongoDB:', err));