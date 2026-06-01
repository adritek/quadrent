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
    } catch (error) {}
  });
};
