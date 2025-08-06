import express from 'express';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
import { User } from '../models/Login.js';


const router = express.Router();

// 🔐 Middleware para verificar refresh token
function authMiddleware(req, res, next) {
  const token = req.cookies?.refreshToken;
  if (!token) return res.status(401).json({ message: 'Falta refresh token' });

  try {
    const payload = verifyRefresh(token);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ message: 'Refresh inválido' });
  }
}

// ✅ POST /login - inicio de sesión
router.post(
  '/registrarse',
  body('email').isEmail(),
  body('password').isString(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) return res.status(401).json({ message: 'Credenciales inválidas' });

    const accessToken = signAccessToken({ sub: user.id, role: user.role });
    const refreshToken = signRefreshToken({ sub: user.id, role: user.role });

    setAuthCookies(res, accessToken, refreshToken);
    res.json({ user: user.toJSON() });
  }
);

// ✅ PUT /editar - editar usuario autenticado
router.put('/editar', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.sub;
    const { name, email, avatarUrl } = req.body;

    if (!name && !email && !avatarUrl) {
      return res.status(400).json({ message: 'No hay datos para actualizar' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          ...(name && { name }),
          ...(email && { email }),
          ...(avatarUrl && { avatarUrl })
        }
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const accessToken = signAccessToken({ sub: userId, role: req.user.role });
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000
    });

    res.json({ ok: true, user: updatedUser.toJSON() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
});

// ✅ GET / - obtener datos del usuario autenticado
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.sub);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    res.json({ user: user.toJSON() });
  } catch {
    res.status(500).json({ message: 'Error al obtener usuario' });
  }
});

// ✅ GET /logout - cerrar sesión
router.get('/logout', (_req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ ok: true, message: 'Sesión cerrada' });
});

export default router;
