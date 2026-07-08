import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

const adminUsername = process.env.ADMIN_USERNAME || 'admin';
const adminPassword = process.env.ADMIN_PASSWORD || 'password123';
const jwtSecret = process.env.JWT_SECRET || 'default-secret';
const jwtExpiresIn = '8h';

router.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (username !== adminUsername || password !== adminPassword) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ username, role: 'admin' }, jwtSecret, { expiresIn: jwtExpiresIn });
  res.json({ token, role: 'admin' });
});

export default router;
