import express from "express";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
import { User } from "../models/Login.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefresh,
  setAuthCookies,
} from "../auth/utils.js"; // ajusta esto si tus funciones están en otro lugar
import { enviarCorreoBienvenida } from "../mailer.js"; // <--- CORRECTO: importación con destructuring

const router = express.Router();

// Middleware de auth con refresh token
function authMiddleware(req, res, next) {
  const token = req.cookies?.refreshToken;
  if (!token) return res.status(401).json({ message: "Falta refresh token" });

  try {
    const payload = verifyRefresh(token);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ message: "Refresh inválido" });
  }
}

// ✅ POST /registrar - crear nuevo usuario
router.post(
  "/registrar",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  body("name").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password, name } = req.body;

    try {
      const userExistente = await User.findOne({ email });
      if (userExistente) {
        return res.status(400).json({ message: "El usuario ya existe" });
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const nuevoUsuario = new User({
        name,
        email,
        passwordHash,
        role: "user",
      });

      await nuevoUsuario.save();

      await enviarCorreoBienvenida(email, name); // ENVÍO DE CORREO 💌

      res.status(201).json({ message: "Usuario registrado correctamente" });
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  }
);

// ✅ POST /registrarse - login de usuario
router.post(
  "/registrarse",
  body("email").isEmail(),
  body("password").isString(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({ message: "Credenciales inválidas" });

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid)
      return res.status(401).json({ message: "Credenciales inválidas" });

    const accessToken = signAccessToken({ sub: user.id, role: user.role });
    const refreshToken = signRefreshToken({ sub: user.id, role: user.role });

    setAuthCookies(res, accessToken, refreshToken);
    res.json({ user: user.toJSON() });
  }
);

// ✅ PUT /editar - editar usuario
router.put("/editar", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.sub;
    const { name, email, avatarUrl } = req.body;

    if (!name && !email && !avatarUrl) {
      return res.status(400).json({ message: "No hay datos para actualizar" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          ...(name && { name }),
          ...(email && { email }),
          ...(avatarUrl && { avatarUrl }),
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const accessToken = signAccessToken({ sub: userId, role: req.user.role });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000,
    });

    res.json({ ok: true, user: updatedUser.toJSON() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
});

import jwt from "jsonwebtoken";
// ...

router.post("/recuperar", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email requerido" });

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "No se encontró el usuario" });
  }

  // Token válido por 15 minutos
  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  const resetLink = `http://localhost:5173/reset-password/${token}`;

  try {
    await transporter.sendMail({
      from: '"FitGym 💪" <' + process.env.CORREO_GMAIL + ">",
      to: email,
      subject: "Recuperación de contraseña",
      html: `<p>Hola ${user.name},</p>
             <p>Para restablecer tu contraseña hacé clic en el siguiente enlace:</p>
             <a href="${resetLink}">${resetLink}</a>
             <p>Este enlace expirará en 15 minutos.</p>`,
    });

    res.json({ message: "Enlace de recuperación enviado" });
  } catch (error) {
    console.error("Error al enviar email:", error);
    res.status(500).json({ message: "Error al enviar el correo" });
  }
});

// ✅ GET / - obtener usuario autenticado
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.sub);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.json({ user: user.toJSON() });
  } catch {
    res.status(500).json({ message: "Error al obtener usuario" });
  }
});

// ✅ GET /logout - cerrar sesión
router.get("/logout", (_req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ ok: true, message: "Sesión cerrada" });
});

export default router;
