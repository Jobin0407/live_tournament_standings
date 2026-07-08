import { Router, Request, Response, NextFunction } from 'express';
import { pool } from '../db';
import { requireAdmin } from '../middleware/auth';

const router = Router();

interface MatchBody {
  team_a_id: number;
  team_b_id: number;
  team_a_score: number;
  team_b_score: number;
}

router.post('/', requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
  const { team_a_id, team_b_id, team_a_score, team_b_score } = req.body as MatchBody;

  if (
    !Number.isInteger(team_a_id) ||
    !Number.isInteger(team_b_id) ||
    !Number.isInteger(team_a_score) ||
    !Number.isInteger(team_b_score) ||
    team_a_id === team_b_id
  ) {
    return res.status(400).json({ error: 'Invalid match payload' });
  }

  try {
    const insert = `
      INSERT INTO matches (team_a_id, team_b_id, team_a_score, team_b_score)
      VALUES ($1, $2, $3, $4)
      RETURNING id, team_a_id, team_b_id, team_a_score, team_b_score, played_at;
    `;
    const result = await pool.query(insert, [team_a_id, team_b_id, team_a_score, team_b_score]);
    res.status(201).json({ match: result.rows[0] });
  } catch (error) {
    next(error);
  }
});

export default router;
