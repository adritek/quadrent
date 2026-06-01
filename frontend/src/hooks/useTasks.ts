import { useState, useEffect, useCallback } from 'react';
import { getTasks, createTask, updateTaskQuadrant } from '../api/tasks.js';
import type { Task, CreateTaskInput } from '../types/task.js';

interface UseTasksReturn {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  addTask: (input: CreateTaskInput) => Promise<void>;
  moveTask: (id: string, rev: string, quadrant: Task['quadrant']) => Promise<void>;
}

export const useTasks = (): UseTasksReturn => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getTasks();
      setTasks(data);
    } catch {
      setError('Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchTasks();
  }, [fetchTasks]);

  const addTask = async (input: CreateTaskInput): Promise<void> => {
    const newTask = await createTask(input);
    setTasks((prev) => [...prev, newTask]);
  };

  const moveTask = async (
    id: string,
    rev: string,
    quadrant: Task['quadrant'],
  ): Promise<void> => {
    const updatedTask = await updateTaskQuadrant(id, rev, quadrant);
    setTasks((prev) => prev.map((task) => (task._id === id ? updatedTask : task)));
  };
  return { tasks, isLoading, error, addTask, moveTask };
};
