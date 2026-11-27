import type { ReactNode } from 'react';
import { TaskContext } from './TaskContext.js';
import { useTasks } from '../hooks/useTasks.js';

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const taskState = useTasks();

  return (
    <TaskContext.Provider value={taskState}>{children}</TaskContext.Provider>
  );
};
