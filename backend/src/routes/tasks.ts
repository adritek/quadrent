import { Router } from 'express';
import type { Request, Response } from 'express';
import { tasksDb } from '../db/client.js';
import type { Quadrant, Task } from '../types/task.js';

const router = Router();

// get everything
router.get('/', async (_req: Request, res: Response) => {
  try {
    const result = await tasksDb.list({ include_docs: true });
    const tasks = result.rows.map((row) => row.doc as Task);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// post
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title } = req.body as { title: string };

    if (!title || title.trim() === '') {
      res.status(400).json({ error: 'Title is required' });
      return;
    }
    const newTask: Task = {
      type: 'task',
      title: title.trim(),
      quadrant: null,
      createdAt: new Date().toISOString(),
    };

    const response = await tasksDb.insert(newTask);
    res.status(201).json({ ...newTask, _id: response.id, _rev: response.rev });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// patch
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const id = String(req.params['id']);
    const { quadrant } = req.body as { quadrant: Quadrant };

    const existing = (await tasksDb.get(id)) as Task;
    const updated: Task = { ...existing, quadrant };

    const response = await tasksDb.insert(updated);
    res.json({ ...updated, _rev: response.rev });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

export default router;
