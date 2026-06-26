import express from 'express';
import cors from 'cors';
import SubjectRouter from './routes/subjects';

const app = express();
const PORT = 8000;

app.use(express.json());

app.use('/api/subjects', SubjectRouter);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);

app.get('/', (req, res) => {
  res.send('Hello, this  the classroom API');
});

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
