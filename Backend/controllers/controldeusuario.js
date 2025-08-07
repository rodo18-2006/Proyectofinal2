import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  try {
    const { nombre, apellido, telefono, dni, email, password, plan } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'Email ya registrado' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      nombre,
      apellido,
      telefono,
      dni,
      email,
      password: hashedPassword,
      plan
    });

    await newUser.save();
    res.status(201).json({ msg: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Error del servidor', error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ msg: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user._id }, 'secreto', { expiresIn: '1d' });

    res.status(200).json({ msg: 'Login exitoso', token, user });
  } catch (error) {
    res.status(500).json({ msg: 'Error del servidor', error });
  }
};
