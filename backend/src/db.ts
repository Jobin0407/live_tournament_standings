import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/live_standings';

export const pool = new Pool({ connectionString });
