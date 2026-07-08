import express from 'express';
import cors from 'cors';
import { json } from 'express';
import authRouter from './routes/auth';
import standingsRouter from './routes/standings';
import matchesRouter from './routes/matches';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(json());

app.use('/auth', authRouter);
app.use('/standings', standingsRouter);
app.use('/matches', matchesRouter);

app.get('/', (_req, res) => {
  res.json({ ok: true, message: 'Live standings backend' });
});

app.use(errorHandler);

export default app;
