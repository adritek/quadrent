import { QuadrantBox } from './QuadrantBox.js';
import type { Task } from '../types/task.js';

interface QuadrantGridProps {
  tasks: Task[];
}

export const QuadrantGrid = ({ tasks }: QuadrantGridProps) => {
  return (
    <div className="grid h-full grid-cols-2 grid-rows-2 gap-3 p-3">
      <QuadrantBox
        title="Urgent & Important"
        quadrant="urgent-important"
        tasks={tasks}
        className="border-red-400 bg-red-50"
      />
      <QuadrantBox
        title="Not Urgent & Important"
        quadrant="not-urgent-important"
        tasks={tasks}
        className="border-blue-400 bg-blue-50"
      />
      <QuadrantBox
        title="Urgent & Not Important"
        quadrant="urgent-not-important"
        tasks={tasks}
        className="border-yellow-400 bg-yellow-50"
      />
      <QuadrantBox
        title="Not Urgent & Not Important"
        quadrant="not-urgent-not-important"
        tasks={tasks}
        className="border-gray-400 bg-gray-50"
      />
    </div>
  );
};
