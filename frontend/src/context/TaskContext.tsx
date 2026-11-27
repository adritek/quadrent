import { createContext, useContext } from 'react';
import { useTasks } from '../hooks/useTasks.js';

export type TaskContextValue = ReturnType<typeof useTasks>;

export const TaskContext = createContext<TaskContextValue | undefined>(
  undefined,
);

export const useTaskContext = (): TaskContextValue => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }

  return context;
};
