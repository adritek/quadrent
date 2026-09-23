import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTaskQuadrant } from '../api/tasks.js';
import type { Task, CreateTaskInput } from '../types/task.js';

interface UseTasksReturn {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  addTask: (input: CreateTaskInput) => Promise<void>;
  moveTask: (id: string, rev: string, quadrant: Task['quadrant']) => Promise<void>;
  refetch: () => void;
}

export const useTasks = (): UseTasksReturn => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getTasks();
        if (!cancelled) setTasks(data);
      } catch {
        if (!cancelled) setError('Failed to load tasks');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  const refetch = () => setRefreshKey((k) => k + 1);

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
  return { tasks, isLoading, error, addTask, moveTask, refetch };
};
