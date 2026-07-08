import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  username: string;
  role: 'admin';
}

export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}

const jwtSecret = process.env.JWT_SECRET || 'default-secret';

export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  const token = authHeader.slice('Bearer '.length);
  try {
    const payload = jwt.verify(token, jwtSecret) as TokenPayload;
    if (payload.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
