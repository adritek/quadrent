import './env.js';
import express from 'express';
import cors from 'cors';
import { initDb } from './db/client.js';
import taskRoutes from './routes/tasks.js';

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors());
app.use(express.json());

//test route
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.use('/tasks', taskRoutes);

await initDb();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost: ${PORT}`);
});
