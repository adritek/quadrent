import axios from 'axios';
import type { Task, CreateTaskInput } from '../types/task.js';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

const api = axios.create({
  baseURL: BASE_URL,
});

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get<Task[]>('/tasks');
  return response.data;
};

export const createTask = async (input: CreateTaskInput): Promise<Task> => {
  const response = await api.post<Task>('/tasks', input);
  return response.data;
};

export const updateTaskQuadrant = async (
  id: string,
  rev: string,
  quadrant: Task['quadrant'],
): Promise<Task> => {
  const response = await api.patch<Task>(`/tasks/${id}`, { quadrant, _rev: rev });
  return response.data;
};
