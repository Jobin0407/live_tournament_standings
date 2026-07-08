import { Router, Request, Response, NextFunction } from 'express';
import { pool } from '../db';

const router = Router();

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const query = `
      SELECT
        t.id,
        t.name,
        COALESCE(SUM(CASE WHEN m.team_a_id = t.id THEN m.team_a_score WHEN m.team_b_id = t.id THEN m.team_b_score ELSE 0 END), 0) AS points_for,
        COALESCE(SUM(CASE WHEN m.team_a_id = t.id THEN m.team_b_score WHEN m.team_b_id = t.id THEN m.team_a_score ELSE 0 END), 0) AS points_against,
        COALESCE(SUM(CASE WHEN m.team_a_id = t.id THEN m.team_a_score - m.team_b_score WHEN m.team_b_id = t.id THEN m.team_b_score - m.team_a_score ELSE 0 END), 0) AS differential,
        COALESCE(SUM(CASE WHEN (m.team_a_id = t.id AND m.team_a_score > m.team_b_score) OR (m.team_b_id = t.id AND m.team_b_score > m.team_a_score) THEN 1 ELSE 0 END), 0) AS wins,
        COALESCE(COUNT(m.id), 0) AS played
      FROM teams t
      LEFT JOIN matches m ON m.team_a_id = t.id OR m.team_b_id = t.id
      GROUP BY t.id, t.name
      ORDER BY wins DESC, differential DESC, points_for DESC, t.name ASC;
    `;

    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

export default router;
