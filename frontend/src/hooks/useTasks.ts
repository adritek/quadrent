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
