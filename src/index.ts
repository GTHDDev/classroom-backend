import AgentApi from 'apminsight';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import subjectsRouter from './routes/subjects.js';
import securityMiddleware from './middleware/security.js';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth.js';

AgentApi.config();

const app = express();
const PORT = 8000;

const frontendOrigin = process.env.FRONTEND_URL?.replace(/\/$/, '');

app.use(
  cors({
    origin: frontendOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);

app.all('/api/auth/*splat', toNodeHandler(auth));

app.use(express.json());

app.use(securityMiddleware);

app.use('/api/subjects', subjectsRouter);

app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
